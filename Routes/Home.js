const HomeController = require("../Controllers/HomeController");
const Route = require("../Core/Route");

module.exports = class Home extends Route{
    constructor() {
        super('')

        this.get('/index', HomeController.HandleHome)

        this.get('/verify', HomeController.HandleVerification)
    }
}