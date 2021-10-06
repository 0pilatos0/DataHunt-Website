const Controller = require('../Core/Controller')
const User = require('../Models/User')

module.exports = class HomeController extends Controller{
    constructor() {
        super()
    }

    static async HandleHome(req, res){
        res.Render("/views/index")
    }
}