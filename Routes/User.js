const UserController = require("../Controllers/UserController");
const Router = require("../Core/Router");
const Account = require("./Account");

module.exports = class User extends Router{
    constructor() {
        super('')

        this.use(Account.Authenticated)

        this.get('/profile', UserController.HandleProfile)

        this.post('/profilePicture', UserController.HandleProfilePicturePost)

        this.post('/changeAccount', UserController.HandleChangeAccountPost)
    }
}