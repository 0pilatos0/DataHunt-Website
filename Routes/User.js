const UserController = require("../Controllers/UserController");
const Route = require("../Core/Route");

module.exports = class User extends Route{
    constructor() {
        super('')

        this.get('/verify', UserController.HandleVerification)

        this.get('/resetpassword', UserController.HandlePasswordReset)

        this.post('/resetpassword', UserController.HandlePasswordResetPost)
    }
}