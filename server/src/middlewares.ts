import * as session from "./middlewares/session";
import auth from './middlewares/auth';
const middlewares: any = [session.createSession(), auth];

export default middlewares;
