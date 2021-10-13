const GameController = require("../Controllers/GameController");
const Route = require("../Core/Route");

module.exports = class Game extends Route{
    constructor() {
        super('')

        this.get('/game', GameController.HandleGame)
    }
}