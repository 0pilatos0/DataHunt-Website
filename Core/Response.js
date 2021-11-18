const fs = require('fs')

module.exports = class Response{
    #res
    #req

    constructor(res, req) {
        this.#res = res;
        this.#req = req;
    }

    send(data){
        this.#res.write(data);
    }

    end(data){
        this.#res.end(data);
    }

    error(){
        this.#res.writeHead(404);
        this.end("404 not found");
    }

    render(path, vars = {}){
        let template = fs.readFileSync(`./views/template.html`, 'utf-8');
        let html = fs.readFileSync(`./views/${path}.html`, 'utf-8');
        Object.keys(vars).map(key => {
            let value = vars[key];
            html = html.replaceAll(`{{${key}}}`, value);
        })
        template = template.replace('{{body}}', html)
        template = template.replace('{{feedback}}', this.#req.session.feedback?.join(""))
        this.#req.session.feedback = [];
        this.#res.write(template);
    }

    redirect(path){
        this.#res.writeHead(302, {
            Location: `${path}`
        })
    }

    createCookie(name, value, maxAge = 30 * 24 * 3600){
        this.#res.writeHead(200, {
            'Set-Cookie': `${name}=${value}; Max-Age=${maxAge}`
        })
    }

    deleteCookie(name){
        this.#res.writeHead(200, {
            'Set-Cookie': `${name}=; Max-Age=0`
        })
    }
    
    sendFile(path){
        if(fs.existsSync(path)){
            this.send(fs.readFileSync(path, 'utf-8'));
        }
        else{
            this.error();
        }
    }
}