import { dispatchRequest } from '../../api/core/router'
import withMiddleware from '../../api/core/middleware'
import '../../api/home'
import '../../api/block'
import '../../api/trade'
import '../../api/addr'
import '../../api/receiver'
import '../../api/balance'

const handle = async (req, res) => {
  return await dispatchRequest(req, res)
}

export default withMiddleware(handle)
