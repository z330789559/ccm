import { dateid } from '../../utils/date';
import BizError, {
  AuthError,
  RouterNotFoundError,
  PermissionDeniedError,
} from './error';

export default (handler, ...middles) => async (req, res) => {
  try {
    for (let i = 0; i < middles.length; i++) {
      await eval(`${middles[i]}(req,res)`);
    }
    const result = await handler(req, res);
    return result ? res.json(result) : res.end();
  } catch (e) {
    const date = dateid();
    const code = getErrorStatus(e);
    const message = e.message;
    console.error(`ERROR_CODE: ${date}.${code} ${message}`);
    console.error(e);
    res.status(code).json({ date, code, message });
  }
};

const getErrorStatus = (e) => {
  let status;
  if (e instanceof BizError) {
    status = 400;
  } else if (e instanceof AuthError) {
    status = 401;
  } else if (e instanceof PermissionDeniedError) {
    status = 403;
  } else if (e instanceof RouterNotFoundError) {
    status = 404;
  } else {
    status = 500;
  }
  return status;
};
