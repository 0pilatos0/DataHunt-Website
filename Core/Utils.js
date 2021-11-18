/**
 * Capitalize the first letter of a given string
 * @param {String} word 
 * @returns {String}
 */
module.exports.firstCharToUpperPerWord = function (word){
    return word.replace(/(^|\s|_)[a-z]/g, function(f){return f.toUpperCase();});
}

/**
 * generates a random string of a random length
 * @param {String} length 
 * @returns {String}
 */
module.exports.randomString = function (length){
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for ( var i = 0; i < length; i++ ) {
        result += characters[Math.floor(Math.random() * characters.length)]
    }
    return result
}