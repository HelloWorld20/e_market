import { ServiceError } from '../modules';
import * as db_crawler from '../db/crawler';
import axios from 'axios';

interface IDataItem {
	from: string;
	to: string;
	lowestPrice: Array<any>;
}
export const getLowestPrise = async () => {
	return await db_crawler.find();
};

export const getHousePrise = async (city: string) => {
	const data = await axios.get(
		`https://fangjia.fang.com/fangjia/common/ajaxtrenddata/${city}?dataType=4&Class=defaultnew&year=20`
	);
	let result = data.data.split('&')[0];
	result = JSON.parse(result).map((v: any) => [
		`${new Date(v[0]).getFullYear()}年${new Date(v[0]).getMonth() + 1}月`,
		v[1]
	]);
	return result;
};
