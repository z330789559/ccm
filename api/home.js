import Router from './core/router'
import { filterBlocks } from '../utils/common'
import mongoose from 'mongoose'

const { Block, Transaction, TokenTransfer, Market } = mongoose.models

Router.get('/home/info', async ({ url }, res) => {
  const block = await Block.findOne({}).sort({ number: -1 }).limit(1)
  const market = await Market.findOne({})
  const transactionNumber = await Transaction.find({}).count()
  const tokenTransfer = await TokenTransfer.find({}).count()
  const tradeNumber = transactionNumber + tokenTransfer
  return {
    block: block.number,
    change: market.change,
    vol: market.vol,
    last: market.last,
    tradeNumber
  }
})

Router.get('/home/charts', async ({ url }, res) => {
  const charts = await Transaction.aggregate([
    {
      $match: {
        timestamp: {
          $gte: new Date().getTime() / 1000 - 10 * 24 * 60 * 60
        }
      }
    },
    {
      $group: {
        _id: {
          year: {
            $year: {
              $add: [new Date(0), { $multiply: [1000, '$timestamp'] }]
            }
          },
          mmonth: {
            $month: {
              $add: [new Date(0), { $multiply: [1000, '$timestamp'] }]
            }
          },
          day: {
            $dayOfMonth: {
              $add: [new Date(0), { $multiply: [1000, '$timestamp'] }]
            }
          }
        },
        count: { $sum: 1 }
      }
    }
  ])
  const list = charts.sort((a, b) => {
    if (a._id.year === b._id.year) {
      if (a._id.mmonth === b._id.mmonth) {
        return a._id.day - b._id.day
      }
      return a._id.mmonth - b._id.mmonth
    }
    return a._id.year - b._id.year
  })
  return list
})

Router.get('/home/block', async ({ url }, res) => {
  const block = await Block.find({}).lean(true).sort({ number: -1 }).limit(10)
  const blockNumber = block[block.length - 1].number
  const results = await Transaction.aggregate([{ $match: { blockNumber: { $gte: blockNumber } } }, { $group: { _id: '$blockNumber', count: { $sum: 1 } } }])
  let txns = {}
  results.forEach((txn) => {
    txns[txn._id] = txn.count
  })
  block.forEach((doc) => {
    doc.txn = txns[doc.number] || 0
  })
  return filterBlocks(block)
})

Router.get('/home/trade', async ({ url }, res) => {
  const results = await Transaction.find({}).lean(true).sort({ blockNumber: -1 }).limit(10)
  return results
})
