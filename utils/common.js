import PermissionDeniedError from '../api/core/error'
import RLP from 'rlp'
import BigNumber from 'bignumber.js'
import etherUnits from '../lib/etherUnits'

const hex2ascii = (hexIn) => {
  const hex = hexIn.toString()
  let str = ''

  try {
    const ba = RLP.decode(hex)
    const test = ba[1].toString('ascii')

    if (test == 'geth' || test == 'Parity') {
      // FIXME
      ba[0] = ba[0].toString('hex')
    }
    str = baToString(ba)
  } catch (e) {
    for (let i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return str
}

// 日期转换
export const formatDate = (date) => {
  date = new Date(date)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  const h = date.getHours()
  let m1 = date.getMinutes()
  m1 < 10 && (m1 = '0' + m1)
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d + ' ' + h + ':' + m1
}

export const getDayName = (serTime) => {
  let td = new Date()
  td = new Date(td.getFullYear(), td.getMonth(), td.getDate())
  let od = new Date(serTime.replace(/-/g, '/'))
  od = new Date(od.getFullYear(), od.getMonth(), od.getDate())
  const xc = (od - td) / 1000 / 60 / 60 / 24
  if (xc < -2) {
    return `${-xc}天前`
  } else if (xc < -1) {
    return '前天'
  } else if (xc < 0) {
    return '昨天'
  } else if (xc === 0) {
    return '今天'
  } else if (xc < 2) {
    return '明天'
  } else if (xc < 3) {
    return '后天'
  } else {
    return `${xc}天后`
  }
}

export const parseQueryString = (url) => {
  const obj = {}
  const str = url.substr(url.indexOf('?') + 1)
  const arr = str.split('&')
  for (let i = 0; i < arr.length; i++) {
    const arr2 = arr[i].split('=')
    obj[arr2[0]] = arr2[1]
  }
  return obj
}
export const colorRgb = (sColor) => {
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    let sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return sColorChange.join(',')
  }
  return '255,255,255'
}

export const authenticationAdmin = (user) => {
  if (!user.admin) {
    throw new PermissionDeniedError('抱歉，请使用管理员账号登陆')
  }
  return true
}

export const compare = (property) => {
  return (a, b) => {
    return b[property] - a[property]
  }
}

/* make blocks human readable */
export const filterBlocks = (blocks) => {
  if (blocks.constructor !== Array) {
    const b = blocks
    const ascii = hex2ascii(blocks.extraData)
    b.extraDataHex = blocks.extraData
    b.extraData = ascii
    return b
  }
  return blocks.map((block) => {
    const b = block
    const ascii = hex2ascii(block.extraData)
    b.extraDataHex = block.extraData
    b.extraData = ascii

    return b
  })
}

export const filterTrace = (txs, value) => {
  return txs.map((tx) => {
    const t = tx
    if (t.type == 'suicide') {
      if (t.action.address) t.from = t.action.address
      if (t.action.balance) t.value = etherUnits.toEther(new BigNumber(t.action.balance), 'wei')
      if (t.action.refundAddress) t.to = t.action.refundAddress
    } else {
      if (t.action.to) t.to = t.action.to
      t.from = t.action.from
      if (t.action.gas) t.gas = new BigNumber(t.action.gas).toNumber()
      if (t.result && t.result.gasUsed) t.gasUsed = new BigNumber(t.result.gasUsed).toNumber()
      if (t.result && t.result.address) t.to = t.result.address
      t.value = etherUnits.toEther(new BigNumber(t.action.value), 'wei')
    }
    return t
  })
}
// 千分位
export const formatDataNumber = (num) => {
  num += ''
  if (!num.includes('.')) num += '.'
  return num
    .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ','
    })
    .replace(/\.$/, '')
}

export const handleGetFee = (price, number) => {
  if (!price) {
    return false
  }
  const priceStr = price.toString()
  const priceLen = priceStr.length
  if (priceLen > number) {
    if (number === 0) {
      return formatDataNumber(priceStr)
    } else {
      const pointNumber = priceLen - number
      if (pointNumber >= 10) {
        return formatDataNumber(priceStr.substring(0, pointNumber))
      } else {
        const feeArr = priceStr.split('')
        feeArr.splice(priceLen - number, 0, '.')
        return formatDataNumber(feeArr.join('').substr(0, feeArr[9] === '.' ? 9 : 10))
      }
    }
  } else {
    const fee = `0.${new Array(number - priceLen + 1).join('0')}${priceStr}`
    return formatDataNumber(fee.substr(0, 10))
  }
}

export const analysisInput = (data, number) => {
  const value = data.toString().substring(74)
  return handleGetFee(new BigNumber(parseInt(value, 16)).toFixed(), number)
}

export const handleAllTrade = (index, value, isReg) => {
  const minerRegex = isReg ? new RegExp(['^', value, '$'].join(''), 'i') : value
  switch (index) {
    case 'out':
      return { $or: [{ from: minerRegex }, { addr: value }] }
    case 'in':
      return { $or: [{ to: minerRegex }, { addr: value }] }
    case 'all':
    default:
      return {
        $or: [{ to: minerRegex }, { from: minerRegex }, { addr: value }]
      }
  }
}

// 判断是否手机
export const isMobile = (userAgent) => {
  const mobileList = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod')
  var mobile = false
  for (var v = 0; v < mobileList.length; v++) {
    if (userAgent.indexOf(mobileList[v]) > 0) {
      mobile = true
      break
    }
  }
  return mobile
}
