module.exports = class Regex{
    static HTMLVar = /{{\w{1,}}}/gm
    static Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    constructor() {
        
    }
}