const http = require('http');
const {requestListener, requests} = require('./RequestListener');

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
        let type = object.constructor.name;
        switch (type) {
            case "Router":
                Object.keys(object.requests).map(key => {
                    object.requests[key].map(request => {
                        requests[key].push({
                            path: path + request.path,
                            callback: request.callback,
                            router: request.router
                        });
                    });
                });
                break;
            default:
                break;
        }
    }
}