import { ServiceError } from '../modules';
import * as db_crawler from '../db/crawler';

interface IDataItem {
    from: string,
    to: string,
    lowestPrice: Array<any>
}
export const getLowestPrise = async () => {
    return await db_crawler.find();
}

// export const getLowestPrise = async () => {
//     let documents: any = await db_crawler.find();
//     const result = documents[0].data.filter((v: IDataItem) => {
//         return !!v.lowestPrice;
//     })
//     return result;
// };
