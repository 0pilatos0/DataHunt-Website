const Controller = require('../Core/Controller');
const Regex = require('../Core/Regex');
const Salter = require('../Core/Salter');
const User = require('../Models/User');

module.exports = class UserController extends Controller{
    constructor() {
        super('')
    }

    static async HandleVerification(req, res){
        let verifytoken = req.Url.vars.token
        let errors = []
        if(!verifytoken) {
            res.Redirect('/')
            res.End()
            errors.push("There was no token provided")
            return
        }
        let user = await User.Find({
            where: {
                verifytoken
            }
        });
        if(user != false){
            await User.Update({
                set: {
                    verifytoken: null,
                    verified: 1
                },
                where:{
                    verifytoken
                }
            })
            res.Render("/views/verified")
        }
        else{
            res.Redirect('/')
            res.End()
            errors.push("User with that verification token couldn't be found")
        }
    }

    static async HandlePasswordReset(req, res){
        let errors = []
        let resettoken = req.Url.vars.token
        req.session.url = `${req.Url.pathname}${req.Url.search}`
        req.session.token = resettoken
        if(!resettoken) {
            res.Redirect('/')
            res.End()
            errors.push("There was no token provided")
            return
        }
        let user = await User.Find({
            where: {
                resettoken
            }
        })
        if(user != false){
            res.Render("/views/resetpassword", {
                email: user.email,
                resettoken
            })
        }
        else{
            res.Redirect('/')
            res.End()
            errors.push("User with that reset token couldn't be found")
        }
    }

    static async HandlePasswordResetPost(req, res){
        const passwordMessage = 'must contain 1 uppercase, 1 lowercase, 1 number and 1 special character'
        let errors = []
        let success = []
        if(req.data.password != ''){
            if(!Regex.Password.test(req.data.password)){
                errors.push(`Password ${passwordMessage}`)
            }
        }
        else{
            errors.push("Password must be filled in")
        }
        if(req.data.repeatPassword != ''){
            if(!Regex.Password.test(req.data.repeatPassword)){
                errors.push(`Repeat password ${passwordMessage}`)
            }
        }
        else{
            errors.push("Repeat password must be filled in")
        }
        let user = await User.Find({
            where:{
                resettoken: req.session.token
            }
        })
        if(user != false){
            if(Salter.VerifyPassword(req.data.password, user.password)){
                errors.push("Password can't be the same as your old password")
                res.Redirect(req.session.url)
                return
            }
        }
        else{
            errors.push("User with that reset token couldn't be found")
            res.Redirect('/')
            return
        }
        if(req.data.password != req.data.repeatPassword){
            errors.push("Passwords aren't the same")
        }
        if(errors.length == 0){
            let hashedPassword = Salter.HashPassword(req.data.password)
            await User.Update({
                set:{
                    resettoken: null,
                    password: hashedPassword
                },
                where:{
                    resettoken: req.session.token
                }
            })
            success.push("Your password has successfully been changed")
            res.Redirect('/')
            return
        }
        console.log(req.session)
        console.log(req.params)
        console.log(req.data)
        res.Redirect(req.session.url)
        delete req.session.url
        delete req.session.token
    }
}