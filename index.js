const WebServer = require("./Core/WebServer");
const Home = require("./Routes/Home");

let ws = new WebServer()
global.ws = ws

new Home()