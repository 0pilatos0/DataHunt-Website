const http = require('http')
const path = require('path')
const HTMLLoader = require('../Loaders/HtmlLoader')
const Request = require('./Request')
const Response = require('./Response')
require('dotenv').config()
const fs = require('fs')
const User = require('../Models/User')

module.exports = class WebServer{
    #http = http.createServer(async (tReq, tRes) => {
        let req = new Request(tReq)
        let res = new Response(tRes)
        if(!path.extname(req.Url.pathname)){
            if(req.Url.pathname == "/game"){
                res.Render('/views/index', {})
                res.End()
            }
            else if(req.Url.pathname == "/verify"){
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
            }
            else{
                res.Render(`/views/${req.Url.pathname}`)
                res.End()
            }
        }
        else if(req.Method === "GET" && path.extname(req.Url.pathname)){
            //Handles files such as js and css
            //let extension = extensionTable[path.extname(req.Url.pathname).substr(1, req.Url.pathname.length)]
            //.substr(req.Url.pathname.lastIndexOf('/'), req.Url.pathname.length)
            let filePath = `${__dirname}/../public${req.Url.pathname}`
            if(fs.existsSync(filePath)) {
                if(path.extname(filePath) == ".js"){
                    tRes.writeHead(200, {
                        'Content-Type': 'text/javascript'
                    })
                }
                res.End(fs.readFileSync(filePath))
            }
            else {
                console.info(filePath)
                console.info(`${req.Url.pathname} doesn't exist`)
                res.End()
            }
        }
    })

    constructor() {
        this.#http.listen(process.env.PORT, () => {
            console.log(`WebServer is running on http://${process.env.HOST}:${process.env.PORT}`)
        })
    }
}