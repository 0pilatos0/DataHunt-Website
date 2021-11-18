const AdminController = require("../Controllers/AdminController");
const Router = require("../Core/Router");

module.exports = class Admin extends Router{
    constructor() {
        this.get('', AdminController.HandleAdmin)

        this.get('/upload', AdminController.HandleUpload)

        this.post('/upload', AdminController.HandleUploadPost)

        this.get('/files', AdminController.HandleFiles)

        this.get('/users', AdminController.HandleUsers)

        this.post('/users/delRole', AdminController.HandleUsersRoleDeletionPost)

        this.post('/users/addRole', AdminController.HandleUsersRoleAddingPost)

        this.get('/pi', AdminController.HandlePi)

        this.get('/productivity', AdminController.HandleProductivity)
    }
}