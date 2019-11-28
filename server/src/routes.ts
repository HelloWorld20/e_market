import test from './controllers/test';
import auth from './controllers/auth';
import service from './controllers/service';
import market from './controllers/market';
import marketH5 from './controllers/market-h5';
import userH5 from './controllers/user-h5';

export default {
    '/api/test': test,
    '/api/admin/auth': auth,
    '/api/service': service,
    '/api/admin/market': market,
    '/api/h5/market': marketH5,
    '/api/h5/user': userH5
};
