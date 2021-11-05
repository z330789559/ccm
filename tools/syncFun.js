/*
 * 该文件将开始从conf.json文件中提供的节点地址同步区块链
 */
require('../lib/cfg')
const BigNumber = require('bignumber.js')
const _ = require('lodash')

const asyncL = require('async')
const Web3 = require('web3-ccm')

const ERC20ABI = require('human-standard-token-abi')

const mongoose = require('mongoose')
const etherUnits = require('../lib/etherUnits.js')
const fetch = require('isomorphic-unfetch')
const { Market } = require('../lib/serverDB.js')
const Block = mongoose.model('Block')
const Transaction = mongoose.model('Transaction')
const Account = mongoose.model('Account')
const Contract = mongoose.model('Contract')
const TokenTransfer = mongoose.model('TokenTransfer')

const ERC20_METHOD_DIC = {
  '0xa9059cbb': 'transfer',
  '0x23b872dd': 'transferFrom'
}

const config = process.cfg.config

console.log(`Connecting ${config.nodeAddr}:${config.wsPort}...`)

// const provider = new Web3.providers.WebsocketProvider(`ws://${config.nodeAddr}:${config.wsPort.toString()}`)
// const web3 = new Web3(provider)

const getProvider = () => {
  const provider = new Web3.providers.WebsocketProvider(`ws://${config.nodeAddr}:${config.wsPort.toString()}`)
  provider.on('connect', () => console.log('WS Connected'))
  provider.on('error', (e) => {
    console.error('WS Error', e)
    web3.setProvider(getProvider())
  })
  provider.on('end', (e) => {
    console.error('WS End', e)
    web3.setProvider(getProvider())
  })

  return provider
}
const web3 = new Web3(getProvider())

const normalizeTX = async (txData, receipt, blockData) => {
  const tx = {
    blockHash: txData.blockHash,
    blockNumber: txData.blockNumber,
    from: txData.from.toLocaleLowerCase(),
    hash: txData.hash.toLocaleLowerCase(),
    value: etherUnits.toEther(new BigNumber(txData.value), 'wei'),
    nonce: txData.nonce,
    r: txData.r,
    s: txData.s,
    v: txData.v,
    gas: txData.gas,
    gasUsed: receipt.gasUsed,
    gasPrice: String(txData.gasPrice),
    input: txData.input,
    transactionIndex: txData.transactionIndex,
    timestamp: blockData.timestamp
  }

  if (receipt.status) {
    tx.status = receipt.status
  }

  if (txData.to) {
    tx.to = txData.to.toLocaleLowerCase()
    return tx
  } else if (txData.creates) {
    tx.creates = txData.creates.toLocaleLowerCase()
    return tx
  } else {
    tx.creates = receipt.contractAddress.toLocaleLowerCase()
    return tx
  }
}

/**
  Write the whole block object to DB
**/
var writeBlockToDB = async function (config, blockData, flush) {
  const self = writeBlockToDB
  if (!self.bulkOps) {
    self.bulkOps = []
  }
  if (blockData && blockData.number >= 0) {
    self.bulkOps.push(new Block(blockData))
    if (!('quiet' in config && config.quiet === true)) {
      console.log(`\t- block #${blockData.number.toString()} inserted.`)
    }
  }

  if ((flush && self.bulkOps.length > 0) || self.bulkOps.length >= config.bulkSize) {
    const bulk = self.bulkOps
    self.bulkOps = []
    if (bulk.length === 0) return
    const request = await fetch(`http://${config.nodeAddr}:${config.httpPost}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'ccm_getSigner',
        params: ['0x5b1e44fbee42f77baba1e8c06ac733cdef0d49939d5a80c2649a09bb236bf29b'],
        id: 1
      })
    })
    const ccm_getSigner = await request.json()
    bulk.forEach((item) => {
      item.miner = ccm_getSigner.result
    })
    console.log(blockData && blockData.number, 'blockData.number')
    Block.collection.insert(bulk, (err, blocks) => {
      if (typeof err !== 'undefined' && err) {
        if (err.code === 11000) {
          if (!('quiet' in config && config.quiet === true)) {
            console.log(`Skip: Duplicate DB key : ${err}`)
          }
        } else {
          console.log(`Error: Aborted due to error on DB: ${err}`)
          process.exit(9)
        }
      } else {
        if (!('quiet' in config && config.quiet === true)) {
          console.log(`* ${blocks.insertedCount} blocks successfully written.`)
        }
      }
    })
  }
}
/**
  Break transactions out of blocks and write to DB
**/
const writeTransactionsToDB = async (config, blockData, flush) => {
  const self = writeTransactionsToDB
  if (!self.bulkOps) {
    self.bulkOps = []
    self.blocks = 0
  }
  // save miner addresses
  if (!self.miners) {
    self.miners = []
  }
  if (blockData) {
    self.miners.push({ address: blockData.miner, blockNumber: blockData.number, type: 0 })
  }
  if (blockData && blockData.transactions.length > 0) {
    for (d in blockData.transactions) {
      const txData = blockData.transactions[d]
      const receipt = await web3.eth.getTransactionReceipt(txData.hash)
      const tx = await normalizeTX(txData, receipt, blockData)
      let contractAddress = ''
      // Contact creation tx, Event logs of internal transaction
      if (txData.input && txData.input.length > 2) {
        // Contact creation tx
        if (txData.to == null) {
          // Support Parity & Geth case
          if (txData.creates) {
            contractAddress = txData.creates.toLocaleLowerCase()
          } else {
            contractAddress = receipt.contractAddress.toLocaleLowerCase()
          }
          // if (contractAddress === '0x20c5ac31c04b2dc789444c639ba978bdb7ec67fc') {
          //   console.log(txData, receipt)
          // }
          // console.log(contractAddress)
          const contractdb = {}
          let isTokenContract = true
          const Token = new web3.eth.Contract(ERC20ABI, contractAddress)
          contractdb.owner = txData.from && txData.from.toLocaleLowerCase()
          contractdb.blockNumber = blockData.number
          contractdb.creationTransaction = txData.hash
          try {
            // console.log('99999999999999999________________')
            const call = await web3.eth.call({ to: contractAddress, data: web3.utils.sha3('totalSupply()') })
            // console.log('88888888888888888________________')

            if (call === '0x') {
              isTokenContract = false
            } else {
              try {
                // ERC20 & ERC223 Token Standard compatible format
                contractdb.tokenName = await Token.methods.name().call()
                contractdb.decimals = await Token.methods.decimals().call()
                contractdb.symbol = await Token.methods.symbol().call()
                contractdb.totalSupply = await Token.methods.totalSupply().call()
              } catch (err) {
                isTokenContract = false
              }
            }
          } catch (err) {
            isTokenContract = false
          }
          contractdb.byteCode = await web3.eth.getCode(contractAddress)
          if (isTokenContract) {
            contractdb.ERC = 2
          } else {
            // Normal Contract
            contractdb.ERC = 0
          }
          // Write to db
          Contract.update({ address: contractAddress }, { $setOnInsert: contractdb }, { upsert: true }, (err, data) => {
            if (err) {
              console.log(err)
            }
            // console.log(contractAddress)
            // console.log(txData.creates, txData.hash, contractAddress, '____________________')
          })
        } else {
          // Internal transaction  . write to doc of InternalTx
          const transfer = {
            hash: '',
            blockNumber: 0,
            from: '',
            to: '',
            contract: '',
            value: 0,
            timestamp: 0
          }
          const methodCode = txData.input.substr(0, 10)
          if (ERC20_METHOD_DIC[methodCode] === 'transfer' || ERC20_METHOD_DIC[methodCode] === 'transferFrom') {
            if (ERC20_METHOD_DIC[methodCode] === 'transfer') {
              // Token transfer transaction
              transfer.from = txData.from && txData.from.toLocaleLowerCase()
              transfer.to = `0x${txData.input.substring(34, 74)}`.toLocaleLowerCase()
              transfer.value = Number(`0x${txData.input.substring(74)}`)
            } else {
              // transferFrom
              transfer.from = `0x${txData.input.substring(34, 74)}`.toLocaleLowerCase()
              transfer.to = `0x${txData.input.substring(74, 114)}`.toLocaleLowerCase()
              transfer.value = Number(`0x${txData.input.substring(114)}`)
            }
            transfer.method = ERC20_METHOD_DIC[methodCode]
            transfer.hash = txData.hash
            transfer.blockNumber = blockData.number
            transfer.contract = txData.to && txData.to.toLocaleLowerCase()
            transfer.timestamp = blockData.timestamp
            // Write transfer transaction into db
            TokenTransfer.update({ hash: transfer.hash }, { $setOnInsert: transfer }, { upsert: true }, (err, data) => {
              if (err) {
                console.log(err)
              }
            })
          }
        }
      }
      self.bulkOps.push(tx)
    }
    if (!('quiet' in config && config.quiet === true)) {
      console.log(`\t- block #${blockData.number.toString()}: ${blockData.transactions.length.toString()} transactions recorded.`)
    }
  }
  self.blocks++

  if ((flush && self.blocks > 0) || self.blocks >= config.bulkSize) {
    const bulk = self.bulkOps
    self.bulkOps = []
    self.blocks = 0
    const { miners } = self
    self.miners = []

    // setup accounts
    const data = {}
    bulk.forEach((tx) => {
      data[tx.from] = { address: tx.from && tx.from.toLocaleLowerCase(), blockNumber: tx.blockNumber, type: 0 }
      if (tx.to) {
        data[tx.to] = { address: tx.to && tx.to.toLocaleLowerCase(), blockNumber: tx.blockNumber, type: 0 }
      }
    })

    // setup miners
    miners.forEach((miner) => {
      data[miner.address] = miner
    })

    const accounts = Object.keys(data)

    if (bulk.length === 0 && accounts.length === 0) return

    // update balances
    if (config.settings.useRichList && accounts.length > 0) {
      asyncL.eachSeries(
        accounts,
        (account, eachCallback) => {
          const { blockNumber } = data[account]
          // get contract account type
          web3.eth.getCode(account, (err, code) => {
            if (err) {
              console.log(`ERROR: fail to getCode(${account})`)
              return eachCallback(err)
            }
            if (code.length > 2) {
              data[account].type = 1 // contract type
            }

            web3.eth.getBalance(account, blockNumber, (err, balance) => {
              if (err) {
                console.log(err)
                console.log(`ERROR: fail to getBalance(${account})`)
                return eachCallback(err)
              }

              data[account].balance = parseFloat(web3.utils.fromWei(balance, 'ether'))
              eachCallback()
            })
          })
        },
        (err) => {
          let n = 0
          accounts.forEach((account) => {
            n++
            if (!('quiet' in config && config.quiet === true)) {
              if (n <= 5) {
                console.log(` - upsert ${account} / balance = ${data[account].balance}`)
              } else if (n === 6) {
                console.log(`   (...) total ${accounts.length} accounts updated.`)
              }
            }
            // upsert account
            Account.collection.update({ address: account }, { $set: data[account] }, { upsert: true })
          })
        }
      )
    }

    if (bulk.length > 0) {
      Transaction.collection.insert(bulk, (err, tx) => {
        if (typeof err !== 'undefined' && err) {
          if (err.code === 11000) {
            if (!('quiet' in config && config.quiet === true)) {
              console.log(`Skip: Duplicate transaction key ${err}`)
            }
          } else {
            console.log(`Error: Aborted due to error on Transaction: ${err}`)
            process.exit(9)
          }
        } else {
          if (!('quiet' in config && config.quiet === true)) {
            console.log(`* ${tx.insertedCount} transactions successfully recorded.`)
          }
        }
      })
    }
  }
}
/**
  //Just listen for latest blocks and sync from the start of the app.
**/
const listenBlocks = function (config) {
  console.log(785)
  web3.eth.getBlock(785, true, (error, blockData) => {
    console.log('监听到区块: ' + blockData.number)
    writeBlockToDB(config, blockData, true)
    writeTransactionsToDB(config, blockData, true)
  })
}
/**
  If full sync is checked this function will start syncing the block chain from lastSynced param see README
**/
var syncChain = function (config, nextBlock) {
  if (web3.eth.net.isListening()) {
    if (typeof nextBlock === 'undefined') {
      prepareSync(config, (error, startBlock) => {
        if (error) {
          console.log(`ERROR: error: ${error}`)
          return
        }
        syncChain(config, startBlock)
      })
      return
    }
    if (nextBlock === null) {
      console.log('nextBlock is null')
      return
    }
    if (nextBlock < config.startBlock) {
      writeBlockToDB(config, null, true)
      writeTransactionsToDB(config, null, true)
      console.log('*** Sync Finsihed ***')
      config.syncAll = false
      return
    }

    let count = config.bulkSize
    console.log(nextBlock)
    if (process.env.SECTION && nextBlock <= process.env.SECTION) {
      return false
    }
    while (nextBlock >= config.startBlock && count > 0) {
      web3.eth.getBlock(nextBlock, true, (error, blockData) => {
        if (error) {
          console.log(`Warning (syncChain): error on getting block with hash/number: ${nextBlock}: ${error}`)
        } else if (blockData === null) {
          console.log(`Warning: null block data received from the block with hash/number: ${nextBlock}`)
        } else {
          writeBlockToDB(config, blockData)
          writeTransactionsToDB(config, blockData)
        }
      })
      nextBlock--
      count--
    }

    setTimeout(() => {
      syncChain(config, nextBlock)
    }, 500)
  } else {
    console.log(`Error: Web3 connection time out trying to get block ${nextBlock} retrying connection now`)
    syncChain(config, nextBlock)
  }
}
/**
  // check oldest block or starting block then callback
**/
const prepareSync = async (config, callback) => {
  let blockNumber = null
  const oldBlockFind = Block.find({}, 'number').lean(true).sort('number').limit(1)
  oldBlockFind.exec(async (err, docs) => {
    if (err || !docs || docs.length < 1) {
      // not found in db. sync from config.endBlock or 'latest'
      if (web3.eth.net.isListening()) {
        const currentBlock = await web3.eth.getBlockNumber()
        const latestBlock = config.endBlock || currentBlock || 'latest'
        if (latestBlock === 'latest') {
          web3.eth.getBlock(latestBlock, true, (error, blockData) => {
            if (error) {
              console.log(`Warning (prepareSync): error on getting block with hash/number: ${latestBlock}: ${error}`)
            } else if (blockData === null) {
              console.log(`Warning: null block data received from the block with hash/number: ${latestBlock}`)
            } else {
              console.log(`Starting block number = ${blockData.number}`)
              if ('quiet' in config && config.quiet === true) {
                console.log('Quiet mode enabled')
              }
              blockNumber = blockData.number
              callback(null, blockNumber)
            }
          })
        } else {
          console.log(`Starting block number = ${latestBlock}`)
          if ('quiet' in config && config.quiet === true) {
            console.log('Quiet mode enabled')
          }
          blockNumber = latestBlock - 1
          callback(null, blockNumber)
        }
      } else {
        console.log('Error: Web3 connection error')
        callback(err, null)
      }
    } else {
      blockNumber = docs[0].number - 1
      console.log(`Old block found. Starting block number = ${blockNumber}`)
      if ('quiet' in config && config.quiet === true) {
        console.log('Quiet mode enabled')
      }
      callback(null, blockNumber)
    }
  })
}
/**
  Block Patcher(experimental)
**/
const runPatcher = async (config, startBlock, endBlock) => {
  if (!web3 || !web3.eth.net.isListening()) {
    console.log('Error: Web3 is not connected. Retrying connection shortly...')
    setTimeout(() => {
      runPatcher(config)
    }, 3000)
    return
  }

  if (typeof startBlock === 'undefined' || typeof endBlock === 'undefined') {
    // get the last saved block
    const blockFind = Block.find({}, 'number').lean(true).sort('-number').limit(1)
    blockFind.exec(async (err, docs) => {
      if (err || !docs || docs.length < 1) {
        // no blocks found. terminate runPatcher()
        console.log('No need to patch blocks.')
        return
      }

      const lastMissingBlock = docs[0].number + 1
      const currentBlock = await web3.eth.getBlockNumber()
      runPatcher(config, lastMissingBlock, currentBlock)
    })
    return
  }

  const missingBlocks = endBlock - startBlock + 1
  if (missingBlocks > 0) {
    if (!('quiet' in config && config.quiet === true)) {
      console.log(`Patching from #${startBlock} to #${endBlock}`)
    }
    let patchBlock = startBlock
    let count = 0
    while (count < config.patchBlocks && patchBlock <= endBlock) {
      if (!('quiet' in config && config.quiet === true)) {
        console.log(`Patching Block: ${patchBlock}`)
      }
      web3.eth.getBlock(patchBlock, true, (error, patchData) => {
        if (error) {
          console.log(`Warning: error on getting block with hash/number: ${patchBlock}: ${error}`)
        } else if (patchData === null) {
          console.log(`Warning: null block data received from the block with hash/number: ${patchBlock}`)
        } else {
          checkBlockDBExistsThenWrite(config, patchData)
        }
      })
      patchBlock++
      count++
    }
    // flush
    writeBlockToDB(config, null, true)
    writeTransactionsToDB(config, null, true)

    setTimeout(() => {
      runPatcher(config, patchBlock, endBlock)
    }, 1000)
  } else {
    // flush
    writeBlockToDB(config, null, true)
    writeTransactionsToDB(config, null, true)

    console.log('*** Block Patching Completed ***')
  }
}
/**
  This will be used for the patcher(experimental)
**/
var checkBlockDBExistsThenWrite = function (config, patchData, flush) {
  Block.find({ number: patchData.number }, (err, b) => {
    if (!b.length) {
      writeBlockToDB(config, patchData, flush)
      writeTransactionsToDB(config, patchData, flush)
    } else if (!('quiet' in config && config.quiet === true)) {
      console.log(`Block number: ${patchData.number.toString()} already exists in DB.`)
    }
  })
}

// // Start listening for latest blocks
listenBlocks(config)
