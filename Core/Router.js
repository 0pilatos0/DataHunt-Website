/**
 * @callback RequestCallback
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */

/**
 * @callback MiddlewareCallback
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */

module.exports = class Router{
    #route
    #gets = {}
    #posts = {}
    #middlewares = []

    constructor(route) {
        this.#route = route
    }

    /**
     * 
     * @param {string} url 
     * @param {RequestCallback} callback 
     */
    get(url, callback){
        let tUrl = `${this.#route}${url}`
        if(!this.#gets[tUrl]){
            this.#gets[tUrl] = {
                callbacks: [],
                router: this
            }
        }
        this.#gets[tUrl].callbacks.push(callback)
    }   

    /**
     * 
     * @param {string} url 
     * @param {RequestCallback} callback 
     */
    post(url, callback){
        let tUrl = `${this.#route}${url}`
        if(!this.#posts[tUrl]){
            this.#posts[tUrl] = {
                callbacks: [],
                router: this
            }
        }
        this.#posts[tUrl].callbacks.push(callback)
    }

    /**
     * 
     * @param {MiddlewareCallback} callback 
     */
    use(callback){
        this.#middlewares.push(callback)
    }

    get posts(){
        return this.#posts
    }

    get gets(){
        return this.#gets
    }

    get route(){
        return this.#route
    }

    get middlewares(){
        return this.#middlewares
    }
}