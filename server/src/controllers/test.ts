import { createRouter, response, catchError } from "../modules";
import * as testSrv from "../services/test";

const router = createRouter();

router.get(
  "/",
  catchError(async (req, res, next) => {
    response.json(res, "results");
  })
);

router.get(
  "/redis",
  catchError(async (req, res, next) => {
    testSrv.getRedis("key");
    response.json(res, "results");
  })
);

router.post(
  "/redis",
  catchError(async (req, res, next) => {
    response.json(res, "results");
  })
);

router.get(
  "/mongo",
  catchError(async (req, res, next) => {
    response.json(res, "results");
  })
);

router.post(
  "/mongo",
  catchError(async (req, res, next) => {
    response.json(res, "results");
  })
);

export default router;
