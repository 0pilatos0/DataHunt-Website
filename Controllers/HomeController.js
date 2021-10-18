const Controller = require('../Core/Controller');
const User = require('../Models/User');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Request = require('../Core/Request');
const Response = require('../Core/Response');

module.exports = class HomeController extends Controller{
    constructor() {
        super()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleHome(req, res, next){
        res.Render("/views/index", {
            username: req.session.user?.username ? `, ${req.session.user?.username}` : "",
        });
        next()
    }
};