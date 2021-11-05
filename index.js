require('./lib/cfg')
const Web3 = require('web3-ccm')
const fetch = require('isomorphic-unfetch')
const http = require('axios')
const provider = new Web3.providers.WebsocketProvider(`ws://47.106.229.244:10088`)
const web3 = new Web3(provider)
const { Market } = require('./lib/serverDB.js')
const BigNumber = require('bignumber.js')

async function bb() {
  // const receipt = await web3.eth.getTransactionReceipt('0xabe09e588165829ae1166229e53d6db652b8ce06514d697cd0010d5a98348d8a')
  const aa = await web3.eth.getBalance('0x56e9250d1b6f7f49fd0ac8219315671e1bead4fa')
  console.log(aa)
  const cc = await web3.eth.getBalance('0x7691e82e0964a39cd27ed2e52f87dba586b7db7e')
  console.log(cc)
  // web3.methods.balanceOf(contractAddress).call({ from: currentAccount }, function (error, result) {
  //   if (!error) {
  //     console.log(result)
  //   } else {
  //     console.log(error)
  //   }
  // })
}

// bb()

const quoteInterval = 10 * 60 * 1000

// const getQuote = async () => {
//   const options = {
//     timeout: 10000
//   }
//   const URL = `https://www.ztb.im/api/v1/tickers`

//   try {
//     const requestUSD = await fetch(URL)
//     const data = await requestUSD.json()
//     console.log(data, 'DATA')
//     let symbolInfo = {}
//     for (ticker in data.ticker) {
//       const item = data.ticker[ticker]
//       if (item.symbol === 'CCM_USDT') {
//         symbolInfo = {
//           symbol: item.symbol,
//           change: item.change,
//           last: item.last,
//           vol: item.vol,
//           timestamp: data.timestamp
//         }
//         symbolInfo.timestamp = data.timestamp
//         break
//       }
//     }
//     console.log(symbolInfo)
//     Market.update({ symbol: symbolInfo.symbol }, symbolInfo, { upsert: true }, (err, data) => {
//       if (err) {
//         console.log(err)
//       }
//       console.log(data, symbolInfo.symbol)
//     })
//   } catch (error) {
//     if (!('quiet' in config && config.quiet === true)) {
//     }
//     console.log(error)
//   }
// }

// getQuote()

// 补块
// function dd() {
//   web3.eth.getBlock(1953741, true, (error, blockData) => {
//     if (error) {
//       console.log(error, 'XXX')
//     }
//     console.log(blockData.hash)
//     web3.eth.getBlock(blockHeader.hash, true, (error, blockData) => {
//       if (blockHeader === null) {
//         console.log('Warning: null block hash')
//       } else {
//         writeBlockToDB(config, blockData, true)
//         writeTransactionsToDB(config, blockData, true)
//       }
//     })
//   })
// }
// dd()

// const dd = async () => {
//   const aa = await web3.eth.getBalance('0x4cf988c8110ede6b9f2115d3a3a2a7f06f11358f')
//   console.log(aa)
// }
// dd()

// const contract = new web3.eth.Contract(abi, ContractAddr)
// module.exports = {
//   // 查询token数量剩余多少
//   balanceOf: async (req, res) => {
//     const owner = req.body.owner
//     await contract.methods
//       .balanceOf('0x76852653f6e5fe5c7ec6675bca6e36cc271b3e76')
//       .call()
//       .then(function (result) {
//         console.log('balanceOf：' + result)
//         // 发送响应数据
//         res.json({
//           msg: 'ok',
//           balanceOf: result.toString()
//         })
//       })
//   }
// }
// {"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}

// //  查询余额0x29f2c9e4caddc0f0ce77c07c3fae3895de10a80e
http
  .post(`http://47.106.229.244:10000`, {
    jsonrpc: '2.0',
    method: 'ccm_call',
    params: [
      {
        data: '0x70a08231000000000000000000000000' + '54256eb9005fdc800a5199b238a9df643ebb0ca3',
        to: '0x9bfe832e970e0667b8a9b502b1651c2a11be40c6'
      },
      'latest'
    ],
    id: 1
  })
  .then(async (data) => {
    console.log(data.data)
  })

let contractabi = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function'
  }
]

let address = '0x54256eb9005fdc800a5199b238a9df643ebb0ca3'
const contractaddress = '0x9bfe832e970e0667b8a9b502b1651c2a11be40c6'
web3.eth.getBalance(address, (err2, bal) => {
  if (!err2) {
    let contractother = web3.eth.Contract(contractabi, contractaddress)
    contractother.methods
      .balanceOf(address)
      .call()
      .then((res) => {
        const Ether = new BigNumber(10e17)
        let ret = new BigNumber(res)
        const data = ret.dividedBy(Ether)
        console.log(res, data)
      })
  } else {
    console.log(err2, 'XX')
  }
})

let tokenAddress = '29f2c9e4caddc0f0ce77c07c3fae3895de10a80e'
let walletAddress = '0x9bfe832e970e0667b8a9b502b1651c2a11be40c6'

// The minimum ABI to get ERC20 Token balance
let minABI = [
  { constant: true, inputs: [], name: 'mintingFinished', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function' },
  { constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' },
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], payable: false, stateMutability: 'view', type: 'function' },
  { constant: true, inputs: [], name: 'cap', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' },
  { constant: false, inputs: [], name: 'unpause', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_amount', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { constant: false, inputs: [{ name: '_value', type: 'uint256' }], name: 'burn', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' },
  { constant: true, inputs: [], name: 'paused', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function' },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_subtractedValue', type: 'uint256' }
    ],
    name: 'decreaseApproval',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  { constant: false, inputs: [], name: 'finishMinting', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' },
  { constant: false, inputs: [], name: 'pause', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' },
  { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' },
  { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_addedValue', type: 'uint256' }
    ],
    name: 'increaseApproval',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  { constant: false, inputs: [{ name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'burner', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'Burn',
    type: 'event'
  },
  { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
  { anonymous: false, inputs: [], name: 'Unpause', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' }
    ],
    name: 'Mint',
    type: 'event'
  },
  { anonymous: false, inputs: [], name: 'MintFinished', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  }
]

// Get ERC20 Token contract instance
// let contract = new web3.eth.Contract([], tokenAddress)

// async function ccc(contract) {
//   const balance = await contract.methods
//     .balanceOf(walletAddress)
//     .call()
//     .then(function (result) {
//       console.log('balanceOf：' + result)
//     })
// }
// ccc(contract)

// Call balanceOf function
// contract.methods.balanceOf(walletAddress, (error, balance) => {
//   // Get decimals
//   contract.decimals((error, decimals) => {
//     // calculate a balance
//     balance = balance.div(10 ** decimals)
//     console.log(balance.toString())
//   })
// })

// var Web3 = require('web3');
// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//     web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/yourAddress"));
// }

// // 定义合约abi
// var contractAbi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

// // 合约地址
// var contractAddress = "0x7FCCF800568747b178c6cBbe4Bf3d147df75ac61";

// // 账号
// var currentAccount = "0x4e9d5c58d8d6f02FFe5A6EF10CB804FfFB556bBb";

// // 定义合约
// var myContract = new web3.eth.Contract(contractAbi, contractAddress, {
//     from: currentAccount, // default from address
//     gasPrice: '10000000000' // default gas price in wei, 10 gwei in this case
// });

// // 查询以太币余额
// web3.eth.getBalance(currentAccount).then(console.log);

// // 查看某个账号的代币余额
// myContract.methods.balanceOf(contractAddress).call({from: currentAccount}, function(error, result){
//     if(!error) {
//         console.log(result);
//     } else {
//         console.log(error);
//     }
// });
