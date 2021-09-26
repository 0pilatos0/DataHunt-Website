const MySQL = require("./Core/MySQL");
const WebServer = require("./Core/WebServer");
const User = require("./Models/User");

let ws = new WebServer()

ws.get('/index', (req, res) => {
    res.Render("/views/index")
})

ws.post('/index', (req, res) => {

})

ws.get('/index/:id/pizza', (req, res) => {
    res.Send("frietjes")
})

ws.get('/verify', async (req, res) => {
    let verifytoken = req.Url.vars.verifytoken
    let user = await User.Find({
        where: {
            verifytoken
        }
    })
    if(user != false){
        await User.Update({
            set: {
                verifytoken: "NULL",
                verified: 1
            },
            where:{
                verifytoken
            }
        })
        res.End("Successfully verified your account")
    }
    else{
        res.Redirect('/')
        res.End()
    }
})