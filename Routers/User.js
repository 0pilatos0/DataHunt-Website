const UserController = require("../Controllers/UserController");
const Router = require("../Core/Router");

module.exports = class User extends Router{
    constructor() {
        this.get('', UserController.HandleProfile)

        this.post('/profilePicture', UserController.HandleProfilePicturePost)

        this.post('/changeAccount', UserController.HandleChangeAccountPost)

        this.get('/deleteProfilePicture', UserController.HandleDeleteProfilePicture)
    }
}