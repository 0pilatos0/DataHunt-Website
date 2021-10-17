const AdminController = require("../Controllers/AdminController");
const Route = require("../Core/Route");

module.exports = class Admin extends Route{
    constructor() {
        super('')

        this.get('/admin', AdminController.HandleAdmin)
    }
}