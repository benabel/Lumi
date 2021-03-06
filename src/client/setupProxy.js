const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        proxy({
            changeOrigin: true,
            target: 'http://localhost:3001'
        })
    );
    app.use(
        '/',
        proxy({
            changeOrigin: true,
            target: 'http://localhost:3001'
        })
    );
};
