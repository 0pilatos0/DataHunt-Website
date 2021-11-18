const Router = require("../Core/Router");

module.exports = class NotAuthenticated extends Router{
    constructor() {
        super()
        this.use((req, res, next) => {
            if(req.session.user){
                res.redirect(`/`);
                return res.end();
            }
            next();
        })
    }
}