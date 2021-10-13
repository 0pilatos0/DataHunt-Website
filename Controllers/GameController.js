const Controller = require('../Core/Controller');

module.exports = class GameController extends Controller{
    constructor() {
        super()
    }

    static async HandleGame(req, res){
        res.Render(`${__dirname}/../../../../../game-runner/_work/DataHunt-Game/DataHunt-Game/index`);
    }
};