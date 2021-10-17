const Controller = require('../Core/Controller');
const User = require('../Models/User');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Request = require('../Core/Request');
const Response = require('../Core/Response');

module.exports = class AdminController extends Controller{
    constructor() {
        super()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleAdmin(req, res){
        if(!req.session.user){
            return res.Redirect(`/login?url=/admin`)
        }
        if(req.session.user.roles.indexOf("admin") == -1){
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, `You don't have the permissions to be here.`))
            return res.Redirect('/')
        }
        res.Render("/views/admin", {
            admin: req.session.user.username
        });
    }
};