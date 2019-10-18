import { createRouter, response, catchError } from '../modules'

console.log(createRouter)

const router = createRouter();

router.get(
  '/',
  catchError(async (req, res, next) => {
    response.json(res, 'results');
  })
);

export default router;