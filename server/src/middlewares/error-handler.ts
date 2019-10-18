import { response } from "../modules";
export default async function(err: any, req: any, res: any) {
  response.error(res, err);
}
