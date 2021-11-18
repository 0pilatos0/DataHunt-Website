require('dotenv').config();
const MySQL = require('./Core/Database/MySQL');
const Router = require('./Core/Router');
const WebServer = require("./Core/WebServer");

new MySQL();

let app = new WebServer();

let router = new Router();

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
    })
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

app.get('/data', (req, res) => {
    console.log(req.session)
    req.session.id = 123
    res.redirect('/')
})

app.get('/data/data', (req, res) => {
    console.log(req.session)
    req.session.id = 123
    res.redirect('/')
})

router.get('/pizza', (req, res) => {
    console.log(req.data)
})

router.post('/pizza', (req, res) => {
    console.log(req.data)
})

app.use('', router);
app.use('/admin', router);
app.use('/pizza', router);

router.use((req, res, next) => {
    console.log("?")
    next()
})

app.listen(process.env.PORT);