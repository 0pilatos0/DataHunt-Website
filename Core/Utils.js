module.exports = class Utils{
    constructor() {
        
    }

    static get URL(){
        return `http://${process.env.HOST}${process.env.PORT != 80 && process.env.PORT != 8080 ? `:${process.env.PORT}` : ""}`
    }

    static firstCharToUpperPerWord(word){
        return word.replace(/(^|\s|_)[a-z]/g, function(f){return f.toUpperCase();});
    }

    static randomId(){
        let id = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for( var i=0; i < 32; i++ )
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        return id;
    }
}