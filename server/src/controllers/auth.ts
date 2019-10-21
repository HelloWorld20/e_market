import { createRouter, response, catchError } from "../modules";
import * as authSrv from "../services/auth";
const router = createRouter();

router.get(
  "/wechatServerValid",
  catchError(async (req, res, next) => {
    const { signature, timestamp, nonce, echostr } = req.query;
    const result = await authSrv.wechatServerValid(signature, timestamp, nonce);
    res.send(result ? echostr : 'valid error')
  })
);

export default router;
