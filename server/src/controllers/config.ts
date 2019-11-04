import { createRouter, response, catchError } from "../modules";
import * as configSrv from "../services/config";
const router = createRouter();

router.get(
  "/",
  catchError(async (req, res, next) => {
    const result = await configSrv.getSystemConfig();
    // response(res, result)
    res.send(result);
  })
);

export default router;
