import Router from './core/router'
import { parseQueryString, filterTrace } from '../utils/common'
import mongoose from 'mongoose'

const { Block, Transaction } = mongoose.models

Router.get('/block', async ({ url }) => {
  const param = parseQueryString(url)
  const ps = parseInt(param.ps) || 10
  const pn = parseInt(param.pn) || 1
  const block = await Block.find({})
    .lean(true)
    .sort({ number: -1 })
    .skip((pn - 1) * ps)
    .limit(ps)
  const total = await Block.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
  const blockNumber = block[block.length - 1].number
  const results = await Transaction.aggregate([{ $match: { blockNumber: { $gte: blockNumber } } }, { $group: { _id: '$blockNumber', count: { $sum: 1 } } }])
  let txns = {}
  results.forEach((txn) => {
    txns[txn._id] = txn.count
  })
  block.forEach((doc) => {
    doc.txn = txns[doc.number] || 0
  })
  return { rows: block, total: total[0].count }
})

Router.get('/block/{id}', async ({ params }) => {
  let results = await Block.findOne({ number: params.id })
  const ts = await Transaction.aggregate([{ $match: { blockNumber: { $gte: results.number } } }, { $group: { _id: '$blockNumber', count: { $sum: 1 } } }])
  const tsNumber = ts.find((item) => item._id === parseInt(params.id))?.count || 0
  return { ts: tsNumber, ...results._doc }
})
