const http = require('http');
const {requestListener, requests} = require('./RequestListener');
const Router = require('./Router');

module.exports = class WebServer{
    #http = http.createServer(requestListener);

    constructor() {
        
    }

    get(path, callback) {
        requests["get"].push({
            path,
            callback
        });
    }

    post(path, callback) {
        requests["post"].push({
            path,
            callback
        });
    }

    listen(port) {
        this.#http.listen(port);
    }

    use(path, object){
        if(object instanceof Router){
            Object.keys(object.requests).map(key => {
                object.requests[key].map(request => {
                    requests[key].push({
                        path: path + request.path,
                        callback: request.callback,
                        router: request.router
                    });
                });
            });
        }
    }
}