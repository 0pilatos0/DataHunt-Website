const GameController = require("../Controllers/GameController");
const Router = require("../Core/Router");

module.exports = class Game extends Router{
    constructor() {
        super('')

        this.get('/game', GameController.HandleGame)

        this.get('/logout', GameController.HandleLogout)
    }
}