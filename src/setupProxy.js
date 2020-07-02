const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy("/v2", {
            target:"https://sandbox-api.brewerydb.com",
            changeOrigin: true
        })
    );

    app.use(
        proxy("/maps", {
            target:"https://maps.googleapis.com",
            changeOrigin: true
        })
    );

    app.use(
        proxy("/api", {
            target:"http://localhost:5000"
        })
    );

    app.use(
        proxy("/user", {
            target:"http://localhost:5000"
        })
    );
}