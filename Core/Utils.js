module.exports.firstCharToUpperPerWord = function (word){
    return word.replace(/(^|\s|_)[a-z]/g, function(f){return f.toUpperCase();});
}

module.exports.randomString = function (length){
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for ( var i = 0; i < length; i++ ) {
        result += characters[Math.floor(Math.random() * characters.length)]
    }
    return result
}