module.exports = class Request{
    #req
    session = {

    }
    params = {}

    constructor(req) {
        this.#req = req
    }

    /**
     * Gets the method of the request
     * @returns {string}
     */
    get method(){
        return this.#req.method
    }

    /**
     * builds a new url
     * @returns {Object}
     */
    get url(){
        let tUrl = new URL(`https://${process.env.HOST}:${process.env.PORT}${this.#req.url}`)
        return {
            href: tUrl.href,
            origin: tUrl.origin,
            protocol: tUrl.protocol,
            username: tUrl.username,
            password: tUrl.password,
            host: tUrl.host,
            hostname: tUrl.hostname,
            port: tUrl.port,
            pathname: tUrl.pathname,
            search: tUrl.search,
            vars: Object.fromEntries(tUrl.searchParams),
            hash: tUrl.hash
        }
    }

    /**
     * Gets all the cookies
     * @returns {Object}
     */
    get cookies(){
        if(!this.#req.headers.cookie) return {}
        let parsedCookies = {}
        this.#req.headers.cookie.split(/;/gm).map(cookie => {
            let splittedCookie = cookie.split('=', 2)
            if(splittedCookie.length == 2){
                parsedCookies[splittedCookie[0].trim()] = splittedCookie[1].trim()
            }
        })
        return parsedCookies
    }

    //TODO extends request
}