import Router from './core/router'
import { parseQueryString } from '../utils/common'
import web3 from './core/monitorWeb3'
import mongoose from 'mongoose'
import BizError from './core/error'

const { Transaction, TokenTransfer, Contract, Block } = mongoose.models

Router.get('/trade', async ({ url }) => {
  const param = parseQueryString(url)
  const ps = parseInt(param.ps) || 10
  const pn = parseInt(param.pn) || 1
  const block = await Transaction.find({})
    .lean(true)
    .sort({ blockNumber: -1 })
    .skip((pn - 1) * ps)
    .limit(ps)
  const total = await Transaction.find({}).count()

  return { rows: block, total }
})

Router.get('/trade/hash/{hash}', async ({ params }) => {
  let results = await Transaction.findOne({ hash: params.hash })
  const block = await Block.findOne().sort({ number: -1 }).limit(1)
  if (!results) {
    throw new BizError('hash Error')
  }

  results._doc.newBlockNumber = block?._doc.number

  const contract = await Contract.findOne({ address: results?._doc.to })
  results._doc.statusV = '0x37'
  if (contract) {
    results._doc.statusV = '0x38'
    const tokenTransfer = await TokenTransfer.findOne({ hash: params.hash })
    results._doc.realAddress = tokenTransfer?._doc.to
    const contract = await Contract.findOne({ address: results?._doc.to })
    results._doc.symbol = contract?._doc.symbol
    results._doc.decimals = contract?._doc.decimals
    const tradeInfo = await web3.eth.getTransactionReceipt(params.hash)
    results._doc.isSuccess = !!tradeInfo?.logs?.length
  }
  return results
})

Router.get('/trade/addr/{hash}', async ({ params }) => {
  let results = await Transaction.findOne({ hash: params.hash })
  if (results?._doc.v === '0x38') {
    const tokenTransfer = await TokenTransfer.findOne({ hash: params.hash })
    results._doc.realAddress = tokenTransfer?._doc.to
  }
  return results
})

Router.get('/trade/number/{number}', async ({ params, url }) => {
  const param = parseQueryString(url)
  const ps = parseInt(param.ps) || 10
  const pn = parseInt(param.pn) || 1
  const rows = await Transaction.find({ blockNumber: params.number })
    .lean(true)
    .sort({ blockNumber: -1 })
    .skip((pn - 1) * ps)
    .limit(ps)
  const total = await Transaction.find({ blockNumber: params.number }).count()
  return { rows, total }
})
