module.exports = class Route{
    #route

    constructor(route) {
        this.#route = route
    }

    /**
     * 
     * @param {string} url 
     * @param {RequestCallback} callback 
     */
    get(url, callback){
        global.ws.get(`${this.#route}${url}`, callback)
    }   

    /**
     * 
     * @param {string} url 
     * @param {RequestCallback} callback 
     */
    post(url, callback){
        global.ws.post(`${this.#route}${url}`, callback)
    }
}