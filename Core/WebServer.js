const http = require('http')
const path = require('path')
const Request = require('./Request')
const Response = require('./Response')
require('dotenv').config()
const fs = require('fs')
const User = require('../Models/User')
const Helper = require('./Helper')
const qs = require('querystring')
const Router = require('./Router')
const Role = require('../Models/Role')

/**
 * @callback RequestCallback
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */

module.exports = class WebServer{
    #posts = {}
    #gets = {}
    #sessions = {}
    #http = http.createServer(async (tReq, tRes) => {
        let req = new Request(tReq)
        let res = new Response(tRes, req)
        let saveSession = () => {
            if(!path.extname(req.Url.pathname)){
                this.#sessions[req.Cookies[process.env.SESSIONCOOKIENAME]] = req.session
            }
        }
        req.On('end', saveSession)
        req.On('close', saveSession)
        if(!path.extname(req.Url.pathname)){
            //#region session logic
            let sessionID = req.Cookies[Object.keys(req.Cookies).find(c => {
                return c == process.env.SESSIONCOOKIENAME
            })]
            if(typeof sessionID !== 'undefined'){
                let session = this.#sessions[Object.keys(this.#sessions).find(s => {
                    return s == sessionID
                })]
                if(typeof session !== 'undefined'){
                    req.session = this.#sessions[sessionID]
                }
                else{
                    this.#sessions[sessionID] = {}
                    req.session = this.#sessions[sessionID] 
                }
            }
            else{
                sessionID = Helper.RandomString(100)
                this.#sessions[sessionID] = {}
                res.CreateCookie(process.env.SESSIONCOOKIENAME, sessionID)
                req.session = this.#sessions[sessionID] 
            }
            //#endregion
            if(!req.session.feedback) req.session.feedback = []
            if(req.session.user){
                let user = await User.Find({
                    where:{
                        username: req.session.user.username
                    }
                })
                if(user == false){
                    delete req.session.user
                }
                else{
                    if(!user.verified || !user.enabled){
                        delete req.session.user
                    }
                }
                let roles = await Role.Select({
                    where: {
                        user_id: req.session.user.id
                    },
                    joins: [
                        "INNER JOIN roles ON users_roles.role_id = roles.id"
                    ],
                    select: ["name"]
                })
                let parsedRoles = []
                roles.map(role => {
                    parsedRoles.push(role.name)
                })
                req.session.user.roles = parsedRoles
            }
            if(req.Method == "GET"){
                let handlers = getHandlers(this.#gets, req, res)
                if(handlers.length > 0){
                    let doneHandlers = 0
                    let next = async () => {
                        doneHandlers++
                        if(doneHandlers == handlers.length){
                            res.End()
                        }
                        else{
                            await handlers[doneHandlers](req, res, next)
                        }
                    }
                    await handlers[0](req, res, next)
                }
                else{
                    res.Error()
                }
            }
            else if(req.Method == "POST"){
                let handlers = getHandlers(this.#posts, req, res)
                let body = ''
                tReq.on('data', (data) => {
                    body += data
                })
                tReq.on('end', async () => {
                    req.data = qs.parse(body)
                    req.data.has = (name) => {
                        return Object.keys(req.data).includes(name)
                    }
                    if(handlers.length > 0){
                        let doneHandlers = 0
                        let next = async () => {
                            doneHandlers++
                            if(doneHandlers == handlers.length){
                                res.End(JSON.stringify(req.data))
                            }
                            else{
                                await handlers[doneHandlers](req, res, next)
                            }
                        }
                        await handlers[0](req, res, next)
                    }
                    else{
                        res.Error()
                    }
                })
            }
            else{
                res.End()
            }
        }
        else if(req.Method === "GET" && path.extname(req.Url.pathname)){
            let setTypeToJSFile = () => {
                if(path.extname(filePath) == ".js"){
                    tRes.writeHead(200, {
                        'Content-Type': 'text/javascript'
                    })
                }
            }
            //Handles files such as js and css, but also html files with .html on the end
            let filePath = `${__dirname}/../Public${req.Url.pathname}`
            if(fs.existsSync(filePath)) {
                setTypeToJSFile()
                res.End(fs.readFileSync(filePath))
            }
            else {
                //console.info(filePath)
                console.info(`${req.Url.pathname} doesn't exist`)
                filePath = `${__dirname}/../../../../../game-runner/_work/DataHunt-Game/DataHunt-Game${req.Url.pathname}`
                if(fs.existsSync(filePath)) {
                    setTypeToJSFile()
                    res.End(fs.readFileSync(filePath))
                }
                else{
                    res.Error()
                }
            }
        }
    })

    constructor() {
        this.#http.listen(process.env.PORT, () => {
            console.log(`WebServer is running on http://${process.env.HOST}:${process.env.PORT}`)
        })
    }

    /**
     * 
     * @param {string} url 
     * @param {RequestCallback} callback 
     */
    get(url, callback){
        if(!this.#gets[url]){
            this.#gets[url] = {
                callbacks: [],
                router: null
            }
        }
        this.#gets[url].callbacks.push(callback)
    }

    /**
     * 
     * @param {string} url 
     * @param {RequestCallback} callback 
     */
    post(url, callback){
        if(!this.#posts[url]){
            this.#posts[url] = {
                callbacks: [],
                router: null
            }
        }
        this.#posts[url].callbacks.push(callback)
    }

    /**
     * 
     * @param {Router} router
     */
    use(router){
        Object.assign(this.#gets, router.gets)
        Object.assign(this.#posts, router.posts)
    }
}


function getHandlers(responses, req, res){
    let splittedUrl = req.Url.pathname.substr(1, req.Url.pathname.length).split('/')
    req.params = []
    let handlers = []
    responses[Object.keys(responses).find(response => {
        let splittedRequestUrl = response.substr(1, response.length).split('/')
        let index = 0
        let correct = splittedRequestUrl.every(piece => {
            if(piece.indexOf(':') == 0){
                let varName = piece.substr(1, piece.length)
                req.params[varName] = splittedUrl[index]
            }
            if(piece == splittedUrl[index] || piece.indexOf(':') == 0){
                index++
                return true
            }
        })
        if(splittedRequestUrl.length == splittedUrl.length && correct){
            responses[response].router.middlewares.map(middleware => {
                handlers.push(middleware)
            })
            return response
        } 
    })]?.callbacks.map(callback => {
        handlers.push(callback)
    })
    return handlers
}