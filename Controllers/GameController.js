const Controller = require('../Core/Controller');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Request = require('../Core/Request');
const Response = require('../Core/Response');
const HTMLLoader = require('../Loaders/HTMLLoader');

module.exports = class GameController extends Controller{
    constructor() {
        super()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleGame(req, res, next){
        if(req.Url.hostname == 'datahunt.duckdns.org'){
            res.Send(HTMLLoader.Read(`${__dirname}/../../../../../game-runner/_work/DataHunt-Game/DataHunt-Game/index.html`).html)
        }
        else{
            res.Error()
        }
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleLogout(req, res, next){
        if(req.session.user){
            delete req.session.user
        }
        req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You successfully logged out`))
        res.Redirect('/login')
        next()
    }
};