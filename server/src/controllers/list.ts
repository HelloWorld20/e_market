import { createRouter, response, catchError } from '../modules'

const router = createRouter();

router.get(
  '/',
  catchError(async (req, res, next) => {
    response.json(res, 'results');
  })
);

export default router;