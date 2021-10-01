const Controller = require('../Core/Controller')
const User = require('../Models/User')

module.exports = class HomeController extends Controller{
    constructor() {
        super()
    }

    static async HandleHome(req, res){
        res.Render("/views/index")
    }

    static async HandleVerification(req, res){
        let verifytoken = req.Url.vars.verifytoken
        if(!verifytoken) {
            res.Redirect('/')
            res.End()
        }
        let user = await User.Find({
            where: {
                verifytoken
            }
        })
        if(user != false){
            await User.Update({
                set: {
                    verifytoken: "NULL",
                    verified: 1
                },
                where:{
                    verifytoken
                }
            })
            res.End("Successfully verified your account")
        }
        else{
            res.Redirect('/')
            res.End()
        }
    }
}