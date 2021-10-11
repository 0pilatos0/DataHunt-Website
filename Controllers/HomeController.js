const Controller = require('../Core/Controller');
const User = require('../Models/User');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');

module.exports = class HomeController extends Controller{
    constructor() {
        super()
    }

    static async HandleHome(req, res){
        if(!req.session.feedback) req.session.feedback = []
        if(req.session.success){
            req.session.success.map(success => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, success))
            })
            delete req.session.success
        }
        if(req.session.errors){
            req.session.errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            delete req.session.errors
        }
        res.Render("/views/index");

    }
};