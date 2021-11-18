const http = require('http');
const path = require('path');
const Request = require('./Request');
const Response = require('./Response');
const qs = require('querystring');
const { randomString } = require('./Utils');

let requests = {
    get: [],
    post: []
}

let sessions = {};

/**
 * 
 * @param {http.IncomingMessage} tReq 
 * @param {http.ServerResponse} tRes 
 */
function requestListener(tReq, tRes){
    let req = new Request(tReq);
    let res = new Response(tRes, req);
    if(requests[req.method.toLowerCase()] && !path.extname(req.url.pathname)){
        let saveOnQuit = function(){
            sessions[req.cookies[`${process.env.SESSIONID}SESSIONID`]] = req.session;
        }
        tReq.on('end', saveOnQuit);
        tReq.on('close', saveOnQuit);
        let cookie = Object.keys(req.cookies).find(cookie => cookie === `${process.env.SESSIONID}SESSIONID`);
        if(typeof cookie !== 'undefined'){
            let session = Object.keys(sessions).find(session => session === req.cookies[cookie]);
            if(typeof session == 'undefined'){
                let sessionID = randomString(100)
                sessions[sessionID] = {
                    feedback: [],
                }
                req.session = sessions[sessionID];
                res.createCookie(`${process.env.SESSIONID}SESSIONID`, sessionID)
            }
            else{
                req.session = sessions[session];
            }
        }
        else{
            let sessionID = randomString(100)
            sessions[sessionID] = {
                feedback: [],
            }
            req.session = sessions[sessionID];
            res.createCookie(`${process.env.SESSIONID}SESSIONID`, sessionID)
        }
        if(req.method == "POST"){
            let body = '';
            tReq.on('data', (data) => {
                body += data;
            })
            tReq.on('end', () => {
                req.body = qs.parse(body);
                handleRequests();
            })
        }
        else{
            handleRequests();
        }
        function handleRequests(){
            let methodRequests = requests[req.method.toLowerCase()];
            let foundRequests = findCorrectRequests(req, methodRequests);
            if(foundRequests.length == 0){
                res.error();
                return;
            }
            let requestIndex = 0;
            let next = async () => {
                let request = foundRequests[requestIndex];
                requestIndex++;
                await request.callback(req, res, next);
                if(requestIndex == foundRequests.length){
                    res.end();
                }
            }
            next();
        }
    }
    else if(req.method == "GET"){
        if(path.extname(req.url.pathname) == ".js"){
            tRes.writeHead(200, {
                'Content-Type': 'text/javascript'
            })
        }
        res.sendFile(path.join(__dirname, "/../public", req.url.pathname));
        res.end();
    }
    else{
        res.error();
    }
}

function findCorrectRequests(req, requests){
    let correctRequests = [];
    let reqPieces = req.url.pathname.substr(1, req.url.pathname.length).split("/");
    requests.map(request => {
        let pieces = request.path.substr(1, request.path.length).split("/");
        if(pieces.length == reqPieces.length){
            let correct = pieces.every(piece => {
                let index = pieces.indexOf(piece);
                if(pieces[index].startsWith(":")){
                    req.params[`${pieces[index].replace(':', '')}`] = reqPieces[index];
                }
                return pieces[index] == reqPieces[index] || pieces[index].startsWith(":");
            })
            if(correct){
                request.router?.middleware.map(middleware => {
                    if(correctRequests.indexOf(middleware) == -1){
                        correctRequests.push({callback:middleware});
                    }
                });
                correctRequests.push(request);
            }
        }
    })
    return correctRequests;
}

module.exports = {requests, requestListener}