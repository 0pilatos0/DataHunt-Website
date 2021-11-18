const AccountController = require("../Controllers/AccountController");
const Router = require("../Core/Router");

module.exports = class Account extends Router{
    constructor() {
        super();

        this.get('/login', AccountController.HandleLogin);

        this.get('/register', AccountController.HandleRegister);

        this.post('/register', AccountController.HandleRegisterPost);

        this.post('/login', AccountController.HandleLoginPost);

        this.get('/verify', AccountController.HandleVerification);

        this.get('/resetpassword', AccountController.HandlePasswordReset);

        this.post('/resetpassword', AccountController.HandlePasswordResetPost);

        this.get('/login/forgotpassword', AccountController.HandleForgotPassword);

        this.post('/login/forgotpassword', AccountController.HandleForgotPasswordPost);

        this.get('/register/forgotpassword', AccountController.HandleForgotPassword);

        this.post('/register/forgotpassword', AccountController.HandleForgotPasswordPost);
    }
}