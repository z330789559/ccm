import Router from './core/router'
import mongoose from 'mongoose'
import { parseQueryString, handleAllTrade } from '../utils/common'

const { Transaction, Account, Contract, TokenTransfer, Block } = mongoose.models

Router.get('/addr/info/{addr}', async ({ params }) => {
  const account = await Account.findOne({ address: params.addr })
  const transaction = await Transaction.find(handleAllTrade('all', params.addr)).count()
  const tokenTransfer = await TokenTransfer.aggregate([{ $match: { $or: [{ from: params.addr }, { to: params.addr }] } }, { $group: { _id: '$contract' } }])
  let token = await Promise.all(
    tokenTransfer.map(async (item) => {
      return await Contract.findOne({ address: item._id })
    })
  )
  let list = []
  token.forEach((item) => {
    item && list.push(item)
  })
  return {
    token: list,
    balance: account?._doc.balance,
    tradeNumber: transaction
  }
})

Router.get('/addr/info/trade/{addr}', async ({ params, url }) => {
  const paramQuery = parseQueryString(url)
  const ps = parseInt(paramQuery.ps) || 10
  const pn = parseInt(paramQuery.pn) || 1
  const rows = await Transaction.find(handleAllTrade(paramQuery.trade, params.addr))
    .sort({ blockNumber: -1 })
    .skip((pn - 1) * ps)
    .limit(ps)
  const total = await Transaction.find(handleAllTrade(paramQuery.trade, params.addr)).count()
  return { rows, total }
})

Router.get('/addr/info/tokenTrade/{addr}', async ({ params, url }) => {
  const paramQuery = parseQueryString(url)
  const ps = parseInt(paramQuery.ps) || 10
  const pn = parseInt(paramQuery.pn) || 1
  let tokenTransfer = await Transaction.find({ $or: [{ from: params.addr }, { addr: params.addr }], $and: [{ value: '0' }, { to: { $exists: true } }] })
    .lean(true)
    .sort({ blockNumber: -1 })
    .skip((pn - 1) * ps)
    .limit(ps)
  const list = await Promise.all(
    tokenTransfer.map(async (item) => {
      return await Contract.findOne({ address: item.to })
    })
  )
  tokenTransfer.forEach((item) => {
    const contract = list.find((li) => item.to.toUpperCase() === li.address.toUpperCase())
    item.symbol = contract.symbol
    item.decimals = contract.decimals
  })
  const total = await Transaction.find({ $or: [{ from: params.addr }, { addr: params.addr }], $and: [{ value: '0' }] }).count()
  return { rows: tokenTransfer, total }
})
