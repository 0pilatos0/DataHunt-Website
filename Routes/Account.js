const AccountController = require("../Controllers/AccountController");
const Router = require("../Core/Router");

module.exports = class Account extends Router{
    constructor() {
        super('')

        this.use(Account.NotAuthenticated)

        this.get('/login', AccountController.HandleLogin)

        this.get('/register', AccountController.HandleRegister)

        this.post('/register', AccountController.HandleRegisterPost)

        this.post('/login', AccountController.HandleLoginPost)

        this.get('/verify', AccountController.HandleVerification)

        this.get('/resetpassword', AccountController.HandlePasswordReset)

        this.post('/resetpassword', AccountController.HandlePasswordResetPost)
    }

    static async Authenticated(req, res, next){
        if(!req.session.user){
            res.Redirect(`/login?url=${req.Url.pathname}`)
            return res.End()
        }
        next()
    }

    static async NotAuthenticated(req, res, next){
        if(req.session.user){
            res.Redirect(`/`)
            return res.End()
        }
        next()
    }
}