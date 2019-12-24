import { createRouter, response, catchError } from '../modules';
import * as crawlerSvr from '../services/crawler';
const router = createRouter();

router.get(
	'/lowestPrise',
	catchError(async (req, res) => {
		const result = await crawlerSvr.getLowestPrise();
		response.json(res, result);
	})
);

router.get(
	'/housePrise/:city',
	catchError(async (req, res) => {
		const { city } = req.params;
		const result = await crawlerSvr.getHousePrise(city);
		response.json(res, result);
	})
);

export default router;
