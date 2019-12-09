import test from './controllers/test';
import auth from './controllers/auth';
import service from './controllers/service';
import marketAdmin from './controllers/market-admin';
import marketH5 from './controllers/market-h5';
import userH5 from './controllers/user-h5';
import crawler from './controllers/crawler';

export default {
    '/api/test': test,
    '/api/admin/auth': auth,
    '/api/service': service,
    '/api/admin/market': marketAdmin,
    '/api/h5/market': marketH5,
    '/api/h5/user': userH5,
    '/api/crawler': crawler
};
