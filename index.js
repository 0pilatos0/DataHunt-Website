const WebServer = require("./Core/WebServer");
const User = require("./Routes/User");
const Home = require("./Routes/Home");

let ws = new WebServer()
global.ws = ws

new Home()
new User()