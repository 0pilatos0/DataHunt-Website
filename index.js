const WebServer = require("./Core/WebServer");
const User = require("./Routes/User");
const Home = require("./Routes/Home");
const Game = require("./Routes/Game");
const Account = require("./Routes/Account");
const Admin = require("./Routes/Admin");

let ws = new WebServer()
global.ws = ws

new Home()
new User()
new Game()
new Account()
new Admin()