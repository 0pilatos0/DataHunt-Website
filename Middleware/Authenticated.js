const Router = require("../Core/Router");

module.exports = class Authenticated extends Router {
    constructor() {
        super()
        this.use((req, res, next) => {
            if(!req.session.user){
                res.redirect(`/login?url=${req.Url.pathname}${req.Url.search}`);
                return res.end();
            }
            next();
        })
    }
}