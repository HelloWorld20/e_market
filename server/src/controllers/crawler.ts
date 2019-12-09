import { createRouter, response, catchError } from '../modules';
import * as crawlerSvr from '../services/crawler';
const router = createRouter();


// 获取所有分类
router.get(
	'/lowestPrise',
	catchError(async (req, res) => {
		const result = await crawlerSvr.getLowestPrise();
		response.json(res, result);
	})
);

export default router;
