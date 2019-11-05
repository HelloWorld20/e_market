import { createRouter, response, catchError } from "../modules";
import * as cosSrv from "../services/cos";
const router = createRouter();

router.post(
  "/upload",
  catchError(async (req, res, next) => {
    const result = await cosSrv.upload(req);
    res.send(result);
  })
);

export default router;
