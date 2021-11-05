import { RouterNotFoundError } from './error'

export default class Router {
  static routerMap = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {}
  }

  static get(url, func) {
    this.routerMap['GET'][url] = func
  }

  static post(url, func) {
    this.routerMap['POST'][url] = func
  }

  static put(url, func) {
    this.routerMap['PUT'][url] = func
  }

  static patch(url, func) {
    this.routerMap['PATCH'][url] = func
  }

  static delete(url, func) {
    this.routerMap['DELETE'][url] = func
  }
}

export const dispatchRequest = async (req, res) => {
  const handleRouter = matchingRouter(req)
  if (handleRouter) {
    return await handleRouter(req, res)
  }
  throw new RouterNotFoundError('404 not found')
}

const matchingRouter = (req) => {
  const pathname = req.pathname.substring(4)
  req.params = {}
  //处理该类型请求的路由
  const handleReqRouters = Router.routerMap[req.method]
  if (handleReqRouters) {
    const allRouterMethodName = Object.keys(handleReqRouters)
    const reqPathArr = pathname.split('/').filter((s) => s !== '')
    const handleMethodName = allRouterMethodName.find((k) => {
      const routerPathArr = k.split('/').filter((s) => s !== '')
      const length = Math.max(reqPathArr.length, routerPathArr.length)
      for (let i = 0; i < length; i++) {
        const v1 = routerPathArr[i]
        const v2 = reqPathArr[i]
        if (v1 === v2) {
          continue
        } else if (v1 && v2 && v1.startsWith('{')) {
          req.params[v1.substring(1, v1.length - 1)] = v2
          continue
        }
        return false
      }
      return k
    })
    return handleReqRouters[handleMethodName]
  }
}
