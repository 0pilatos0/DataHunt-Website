const AccountController = require("../Controllers/AccountController");
const Request = require("../Core/Request");
const Response = require("../Core/Response");
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

        this.get('/login/forgotpassword', AccountController.HandleForgotPassword)

        this.post('/login/forgotpassword', AccountController.HandleForgotPasswordPost)

        this.get('/register/forgotpassword', AccountController.HandleForgotPassword)

        this.post('/register/forgotpassword', AccountController.HandleForgotPasswordPost)
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async Authenticated(req, res, next){
        if(!req.session.user){
            res.Redirect(`/login?url=${req.Url.pathname}${req.Url.search}`)
            return res.End()
        }
        next()
    }


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */    
    static async NotAuthenticated(req, res, next){
        if(req.session.user){
            res.Redirect(`/`)
            return res.End()
        }
        next()
    }
}