const HomeController = require("../Controllers/HomeController");
const Router = require("../Core/Router");

module.exports = class Home extends Router{
    constructor() {
        super('')

        this.get('/index', HomeController.HandleHome)
    }
}