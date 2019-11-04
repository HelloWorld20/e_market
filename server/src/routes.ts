import test from "./controllers/test";
import auth from "./controllers/auth";
import config from './controllers/config';


export default {
  "/api/test": test,
  "/api/auth": auth,
  "/api/config": config
};
