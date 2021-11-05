import unfetch from 'isomorphic-unfetch'
import { getCookies } from './cookie'
import { dateid } from '../utils/date'
import { message } from 'antd'

const errorTip = message

export const fetch = (url, ctx, params = {}) => {
  if (!url.startsWith('http')) {
    url = `http://localhost:${process.cfg.server.port}${url}`
  }

  return unfetch(url, params)
    .then((response) => {
      if (response.ok) {
        return response.text().then(jsonIt)
      }
      throw { status: response.status, response }
    })
    .catch((err) => {
      const { status } = err
      console.error(`request api ${url} status：${status} error：`, err)
      if (status === 401) {
        ctx.res.writeHead(302, { Location: '/login' })
      } else {
        ctx.res.writeHead(status ?? 500)
      }
      ctx.res.end()
    })
}

const mkops = (method, data) => {
  let payload = {
    method,
    headers: {}
  }
  if (method !== 'GET') {
    payload.headers['Content-Type'] = 'application/json; charset=utf-8'
    if (method !== 'DELETE') {
      payload.body = JSON.stringify(data || {})
    }
  }
  return payload
}

const jsonIt = (d) => {
  try {
    return JSON.parse(d)
  } catch (e) {
    return { code: 600, message: e.message, text: d }
  }
}

const send = (url, options, success, error) => {
  return unfetch(url, options)
    .then(async (response) => {
      if (response.ok) {
        const data = await response.text().then(jsonIt)
        success?.(data)
        return Promise.resolve(data)
      } else {
        const data = await response.text().then(jsonIt)
        if (data.code === 600) {
          throw {
            code: response.status,
            message: response.statusText,
            date: dateid()
          }
        } else {
          throw data
        }
      }
    })
    .catch(async (err) => {
      console.log(err)
      const { date, code, message } = err
      if (error) {
        error(err)
        return
      }
      if (code == 400) {
        errorTip.error(message)
      } else if (code === 401) {
        location.href = '/login'
      } else if (code == 500) {
        errorTip.error(`${date}.${code} Server Error`)
      } else if (((code / 100) | 0) == 5) {
        errorTip.error('Server Error')
      } else if (code) {
        errorTip.error(`${date}.${code} Server Error`)
      } else {
        errorTip.error(`${dateid()}.604 Server Error`)
      }
    })
}

export default {
  get: (url, success, error) => {
    return send(url, mkops('GET'), success, error)
  },
  post: (url, data, success, error) => {
    return send(url, mkops('POST', data), success, error)
  },
  patch: (url, data, success, error) => {
    return send(url, mkops('PATCH', data), success, error)
  },
  put: (url, data, success, error) => {
    return send(url, mkops('PUT', data), success, error)
  },
  delete: (url, success, error) => {
    return send(url, mkops('DELETE'), success, error)
  }
}
