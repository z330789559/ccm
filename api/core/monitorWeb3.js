import Web3 from 'web3-ccm'

const config = process.cfg.config

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

const getWeb3 = () => {
  if (global.web3?.eth) {
    return global.web3
  } else {
    const web3 = new Web3(getProvider())
    global.web3 = web3
    return web3
  }
}

export default getWeb3()
