const UserController = require("../Controllers/UserController");
const Route = require("../Core/Route");

module.exports = class User extends Route{
    constructor() {
        super('')

        this.get('/profile', UserController.HandleProfile)

        this.post('/profilePicture', UserController.HandleProfilePicturePost)

        this.post('/changeAccount', UserController.HandleChangeAccountPost)
    }
}