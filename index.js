const WebServer = require("./Core/WebServer");
const User = require("./Routes/User");
const Home = require("./Routes/Home");
const Game = require("./Routes/Game");
const Account = require("./Routes/Account");
const Admin = require("./Routes/Admin");

let ws = new WebServer()

ws.use(new Home())
ws.use(new User())
ws.use(new Game())
ws.use(new Account())
ws.use(new Admin())