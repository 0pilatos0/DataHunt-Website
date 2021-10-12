const Controller = require('../Core/Controller');
const Regex = require('../Core/Regex');
const Salter = require('../Core/Salter');
const User = require('../Models/User');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');

module.exports = class UserController extends Controller{
    constructor() {
        super('')
    }

    static async HandleVerification(req, res){
        let verifytoken = req.Url.vars.token
        let errors = []
        let success = []
        req.session.feedback = []
        if(!verifytoken) {
            errors.push("There was no token provided")
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
            success.push(`You successfully verified your account`)
        }
        else if(verifytoken){
            errors.push(`User with verification token '${verifytoken}' couldn't be found`)
        }
        errors.map(error => {
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
        })
        success.map(success => {
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, success))
        })
        res.Redirect('/')
    }

    static async HandlePasswordReset(req, res){
        let errors = []
        let resettoken = req.Url.vars.token
        req.session.url = `${req.Url.pathname}${req.Url.search}`
        req.session.token = resettoken
        req.session.feedback = []

        let handleErrors = () => {
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            delete req.session.errors
            if(errors.length > 0){
                res.Redirect('/')
            }
        }

        if(!resettoken) {
            errors.push("There was no token provided")
            handleErrors()
            return
        }
        let user = await User.Find({
            where: {
                resettoken
            }
        })
        if(user != false){
            if(req.session.errors){
                req.session.errors.map(error => {
                    req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
                })
                delete req.session.errors
            }
            res.Render("/views/resetpassword", {
                email: user.email,
                resettoken
            })
        }
        else{
            errors.push(`User with reset token '${resettoken}' couldn't be found`)
        }
        handleErrors()
    }

    static async HandlePasswordResetPost(req, res){
        const passwordMessage = 'must contain 1 uppercase, 1 lowercase, 1 number and 1 special character'
        req.session.errors = []
        let success = []
        if(req.data.password != ''){
            if(!Regex.Password.test(req.data.password)){
                req.session.errors.push(`Password ${passwordMessage}`)
            }
        }
        else{
            req.session.errors.push("Password must be filled in")
        }
        if(req.data.repeatPassword != ''){
            if(!Regex.Password.test(req.data.repeatPassword)){
                req.session.errors.push(`Repeat password ${passwordMessage}`)
            }
        }
        else{
            req.session.errors.push("Repeat password must be filled in")
        }
        let user = await User.Find({
            where:{
                resettoken: req.session.token
            }
        })
        if(user != false){
            if(Salter.VerifyPassword(req.data.password, user.password)){
                req.session.errors.push("Password can't be the same as your old password")
            }
        }
        else{
            req.session.errors.push(`User with reset token '${req.session.token}' couldn't be found`)
        }
        if(req.data.password != req.data.repeatPassword){
            req.session.errors.push("Passwords aren't the same")
        }
        if(req.session.errors.length == 0){
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
        }
        if(req.session.errors.length > 0){
            res.Redirect(req.session.url)
        }
        if(success.length > 0){
            req.session.success = success
            res.Redirect('/')
        }
        delete req.session.url
        delete req.session.token
    }
}