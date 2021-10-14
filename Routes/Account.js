const AccountController = require("../Controllers/AccountController");
const Route = require("../Core/Route");

module.exports = class Account extends Route{
    constructor() {
        super('')

        this.get('/login', AccountController.HandleLogin)

        this.get('/register', AccountController.HandleRegister)

        this.post('/register', AccountController.HandleRegisterPost)

        this.post('/login', AccountController.HandleLoginPost)

        this.get('/verify', AccountController.HandleVerification)

        this.get('/resetpassword', AccountController.HandlePasswordReset)

        this.post('/resetpassword', AccountController.HandlePasswordResetPost)

        this.get('/logout', AccountController.HandleLogout)
    }
}