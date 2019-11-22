import test from './controllers/test';
import auth from './controllers/auth';
import config from './controllers/config';
import service from './controllers/service';
import market from './controllers/market';
import marketH5 from './controllers/market-h5';

export default {
    '/api/test': test,
    '/api/auth': auth,
    '/api/config': config,
    '/api/service': service,
    '/api/market': market,
    '/api/market/h5': marketH5,
};
