import Router from './core/router'
import { parseQueryString, handleAllTrade } from '../utils/common'
import mongoose from 'mongoose'
const { Contract, TokenTransfer, Transaction } = mongoose.models

Router.get('/receiver/info/{addr}', async ({ params }) => {
  const contract = await Contract.findOne({ address: params.addr })
  return contract
})

Router.get('/receiver/list/{addr}', async ({ params, url }) => {
  const paramQuery = parseQueryString(url)
  const ps = parseInt(paramQuery.ps) || 10
  const pn = parseInt(paramQuery.pn) || 1

  const total = await Transaction.find(handleAllTrade(paramQuery.trade, params.addr)).count()
  let tokenTransfer = await Transaction.find(handleAllTrade(paramQuery.trade, params.addr))
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
    item._doc.symbol = contract.symbol
    item._doc.decimals = contract.decimals
  })
  return { total, rows: tokenTransfer }
})
