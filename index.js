require('dotenv').config();
const MySQL = require('./Core/Database/MySQL');
const Account = require('./Routers/Account');
const WebServer = require("./Core/WebServer");

MySQL.connect(process.env.DB);

let app = new WebServer();

let accountRouter = new Account();

app.use('', accountRouter);

app.listen(process.env.PORT);