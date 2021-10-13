const Controller = require('../Core/Controller');
const HTMLLoader = require('../Loaders/HTMLLoader');

module.exports = class GameController extends Controller{
    constructor() {
        super()
    }

    static async HandleGame(req, res){
        res.Send(HTMLLoader.Read(`${__dirname}/../../../../../game-runner/_work/DataHunt-Game/DataHunt-Game/index`).html);
    }
};