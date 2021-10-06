module.exports = class Helper{
    constructor() {
        
    }

    static RandomString(length){
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for ( var i = 0; i < length; i++ ) {
            result += characters[Math.floor(Math.random() * characters.length)]
        }
        return result
    }
}