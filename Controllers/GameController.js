const Controller = require('../Core/Controller');
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
    static async HandleGame(req, res){
        res.Send(HTMLLoader.Read(`${__dirname}/../../../../../game-runner/_work/DataHunt-Game/DataHunt-Game/index.html`).html);
    }
};