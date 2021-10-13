const WebServer = require("./Core/WebServer");
const User = require("./Routes/User");
const Home = require("./Routes/Home");
const Game = require("./Routes/Game");

let ws = new WebServer()
global.ws = ws

new Home()
new User()
new Game()