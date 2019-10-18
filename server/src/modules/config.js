let config = {
    NODE_ENV: 'production',
    RUNTIME_ENV: 'RUNTIME_ENV',
    host: 'http://localhost',
    port: 3000
}

function getInternally(conf, key) {
    const keys = key.split('.');
    let result = conf;
    for (const k of keys) {
        result = result[k];
        if (result == null)
            return null;
    }
    return result;
}

exports.get = function (key) {
    return getInternally(config, key)
}