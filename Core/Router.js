const Request = require('../Core/Request')
const Response = require('../Core/Response')

module.exports = class Router{
    #requests = {
        get: [],
        post: []
    }

    #middleware = []

    constructor() {
        
    }

    get(path, callback){
        this.#requests["get"].push({
            path,
            callback,
            router: this
        })
    }

    post(path, callback){
        this.#requests["post"].push({
            path,
            callback,
            router: this
        })
    }

    /**
     * 
     * @param {RouterCallback} callback 
     */
    use(callback){
        this.#middleware.push(callback)
    }

    get requests(){
        return this.#requests
    }

    get middleware(){
        return this.#middleware
    }
}

/**
 * @callback RouterCallback
 * @param {Request} request
 * @param {Response} response
 * @param {callback} next
 */