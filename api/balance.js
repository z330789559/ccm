import Router from './core/router'
import web3 from './core/monitorWeb3'
import BigNumber from 'bignumber.js'
import { parseQueryString } from '../utils/common'

const contractabi = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function'
  }
]

Router.get('/addr/token/balance', async ({ url }) => {
  const param = parseQueryString(url)
  const { address, contractaddress, decimals } = param
  const contractother = web3.eth.Contract(contractabi, contractaddress)
  const balance = await contractother.methods.balanceOf(address).call()
  if (balance) {
    const Ether = new BigNumber(`10e${decimals !== undefined ? decimals - 1 : 17}`)
    let ret = new BigNumber(balance)
    const data = ret.dividedBy(Ether)
    return data
  } else {
    return ''
  }
})
