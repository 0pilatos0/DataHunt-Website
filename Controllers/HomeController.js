const Controller = require('../Core/Controller');
const User = require('../Models/User');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');

module.exports = class HomeController extends Controller{
    constructor() {
        super()
    }

    static async HandleHome(req, res){
        res.Render("/views/index", {
            feedback: Feedback.ShowFeedback(FeedbackEnum.SUCCESS, "test message")
        });

    }
};