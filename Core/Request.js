const http = require('http')

module.exports = class Request{
    #req
    session = {}
    data = {}

    /**
     * 
     * @param {http.IncomingMessage} req 
     */
    constructor(req) {
        this.#req = req
    }

    get Method(){
        return this.#req.method
    }

    get Url(){
        let parsedUrl = new URL(`https://${process.env.HOST}:${process.env.PORT}${this.#req.url}`)
        if(parsedUrl.pathname === "/") parsedUrl.pathname = "/index"
        return {
            href: parsedUrl.href,
            origin: parsedUrl.origin,
            protocol: parsedUrl.protocol,
            username: parsedUrl.username,
            password: parsedUrl.password,
            host: parsedUrl.host,
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            pathname: parsedUrl.pathname,
            search: parsedUrl.search,
            vars: Object.fromEntries(parsedUrl.searchParams),
            hash: parsedUrl.hash
        }
    }

    get Cookies(){
        if(!this.#req.headers.cookie) return {}
        let parsedCookies = {}
        this.#req.headers.cookie.split(/;/gm).map((c) => {
            let splittedCookie = c.split('=', 2)
            parsedCookies[splittedCookie[0].trim()] = splittedCookie[1].trim()
        })
        return parsedCookies
    }
}