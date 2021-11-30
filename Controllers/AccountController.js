const Controller = require('../Core/Controller');
const Request = require('../Core/Request');
const Response = require('../Core/Response');
const Regex = require('../Core/Regex');
const Salter = require('../Core/Salter');
const User = require('../Database/Models/User')
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Mailer = require('../Core/Mailer');
const HTMLLoader = require('../Loaders/HTMLLoader');
const Utils = require('../Core/Utils');
const Users_Role = require('../Database/Models/Users_Role')
const Profile_Picture = require('../Database/Models/Profile_Picture');

module.exports = class AccountController extends Controller{
    constructor() {
        super()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleLogin(req, res, next){
        res.Render("/views/account/login", {
            email: req.session.email || ""
        })
        delete req.session.email
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleRegister(req, res, next){
        res.Render("/views/account/register", {
            name: req.session.name || "",
            username: req.session.username || "",
            email: req.session.email || ""
        })
        delete req.session.name
        delete req.session.username
        delete req.session.email
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleRegisterPost(req, res, next){
        let errors = []
        let verificationToken = Salter.GenerateRandomToken()
        let errorFeedback = () => {
            req.session.username = req.data.username
            req.session.email = req.data.email
            req.session.name = req.data.name
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            res.Redirect('/register')
            next()
        }
        if(req.data.name != ""){
            if(!req.data.name.match(Regex.Name)){
                errors.push(`Name can't contain numbers`)
            }
        }
        else{
            errors.push(`Name can't be empty`)
        }
        if(req.data.username != ""){
            if(!req.data.username.match(Regex.Username)){
                errors.push(`Username must be between 5 and 29 characters long`)
            }
        }
        else{
            errors.push(`Username can't be empty`)
        }
        if(req.data.email != ""){
            if(!req.data.email.match(Regex.Email)){
                errors.push(`Email must contain an '@' and must end on an extension for example @datahunt.nl`)
            }
        }
        else{
            errors.push(`Email can't be empty`)
        }
        if(req.data.password != ""){
            if(!req.data.password.match(Regex.Password)){
                errors.push(`Password must be atleast 8 characters long, contain an special character and 1 number and 1 uppercase`)
            }
        }
        else{
            errors.push(`Password can't be empty`)
        }
        if(req.data.repeatPassword != ""){
            if(req.data.repeatPassword.match(Regex.password) && req.data.password != req.data.repeatPassword){
                errors.push(`Passwords must be the same`)
            }
        }
        else{
            errors.push(`Repeat password can't be empty`)
        }
        if(errors.length > 0) return errorFeedback()
        let userId = await User.FindId({
            where: {
                username: req.data.username
            }
        })
        if(userId){
            errors.push(`User with username ${req.data.username} already exists`)
            return errorFeedback()
        }
        userId = await User.FindId({
            where: {
                email: req.data.email
            }
        })
        if(userId){
            errors.push(`User with email ${req.data.email} already exists`)
            return errorFeedback()
        }
        await User.Create({
            create: {
                name: req.data.name,
                username: req.data.username,
                email: req.data.email,
                password: Salter.HashPassword(req.data.password),
                verifytoken: verificationToken
            }
        })
        let html = HTMLLoader.Read(`${__dirname}/../Mail/activationMail.html`).html
        html = HTMLLoader.Replace(html, {
            url: `${Utils.URL}/verify?token=${verificationToken}`,
            username: req.data.username
        })
        let mailState = await Mailer.SendMail({
            to: req.data.email,
            subject: 'DataHunt user registration',
            html: html
        })
        req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You now received an email with a verification link to verify your account`))
        res.Redirect('/login')
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleLoginPost(req, res, next){
        let errors = []
        let errorFeedback = () => {
            req.session.email = req.data.email
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            res.Redirect(`${req.Url.pathname}${req.Url.search}`)
        }
        if(req.data.email == ""){
            errors.push(`Email can't be empty`)
        }
        if(req.data.password == ""){
            errors.push(`Password can't be empty`)
        }
        let user = await User.Find({
            where:{
                email: req.data.email
            }
        })
        if(user !== false){
            if(!user.verified){
                errors.push(`Your account must be verified to login`)
            }
            if(!user.enabled){
                errors.push(`Your account is disabled because you are banned`)
            }
            if(errors.length == 0){
                if(!Salter.VerifyPassword(req.data.password, user.password)){
                    errors.push("Your email or password is incorrect")
                }
            }
        }
        else if(errors.length == 0){
            errors.push("Your email or password is incorrect")
        }
        let roles = await Users_Role.Select({
            where: {
                user_id: user.id
            },
            joins: [
                "INNER JOIN roles ON users_roles.role_id = roles.id"
            ],
            select: ["name"]
        })
        let parsedRoles = []
        roles.map(role => {
            parsedRoles.push(role.name)
        })
        let profilePicture = await Profile_Picture.Find({
            where: {
                user_id: user.id
            },
            select: ['image']
        })
        if(profilePicture != false){
            profilePicture = profilePicture.image
        }
        if(errors.length == 0){
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `Logged in successfully`))
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                roles: parsedRoles,
            }
            if(profilePicture != false){
                req.session.user.profilePicture = profilePicture
            }
            if(req.Url.vars?.url){
                res.Redirect(req.Url.vars.url)
            }
            else{
                res.Redirect('/')
            }
        } 
        else{
            errorFeedback()
        }
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleVerification(req, res, next){
        let verifytoken = req.Url.vars.token
        let errors = []
        let success = []
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
            success.push(`You have successfully verified your account`)
        }
        else if(verifytoken){
            errors.push(`User with verification token '${verifytoken}' could not be found`)
        }
        errors.map(error => {
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
        })
        success.map(success => {
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, success))
        })
        res.Redirect('/')
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandlePasswordReset(req, res, next){
        let errors = []
        let resettoken = req.Url.vars.token
        req.session.url = `${req.Url.pathname}${req.Url.search}`
        req.session.token = resettoken

        let handleErrors = () => {
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            if(errors.length > 0){
                res.Redirect('/')
            }
            next()
        }

        if(!resettoken) {
            errors.push("There was no token provided")
            return handleErrors()
        }
        let user = await User.Find({
            where: {
                resettoken
            }
        })
        if(user != false){
            res.Render("/views/account/resetpassword", {
                email: user.email,
                resettoken
            })
        }
        else{
            errors.push(`User with reset token '${resettoken}' could not be found`)
        }
        handleErrors()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandlePasswordResetPost(req, res, next){
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
            }
        }
        else{
            errors.push(`User with reset token '${req.session.token}' could not be found`)
        }
        if(req.data.password != req.data.repeatPassword){
            errors.push("Passwords don't match")
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
            success.push("Your password has been successfully changed")
        }
        if(errors.length > 0){
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            res.Redirect(req.session.url)
        }
        if(success.length > 0){
            success.map(success => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, success))
            })
            res.Redirect('/')
        }
        delete req.session.url
        delete req.session.token
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleForgotPassword(req, res, next){
        res.Render('/views/account/forgotpassword')
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleForgotPasswordPost(req, res, next){
        let errors = []
        let success = []
        if(req.data.email == ''){
            errors.push(`Email can't be empty`)
        }
        else{
            if(!req.data.email.match(Regex.Email)){
                errors.push(`Email must contain an '@' and must end on an extension for example @datahunt.nl`)
            }
        }
        if(errors.length == 0){
            let user = await User.Find({
                where: {
                    email: req.data.email
                }
            })
            if(user != false){
                if(user.verified){
                    if(user.resettoken == null){
                        let token = Salter.GenerateRandomToken()  
                        await User.Update({
                            where: {
                                email: req.data.email
                            },
                            set: {
                                resettoken: token
                            }
                        })
                        let htmlData = HTMLLoader.Read("./Mail/resetPasswordMail.html").html
                        htmlData = htmlData.replace('{{url}}', `http://${process.env.HOST}${process.env.PORT != 80 && process.env.PORT != 8080 ? `:${process.env.PORT}` : ""}/resetpassword?token=${token}`)
                        htmlData = htmlData.replace('{{username}}', user.username)
                        let mailState = await Mailer.SendMail({
                            to: user.email,
                            subject: 'DataHunt reset password',
                            html: htmlData
                        })
                        success.push("We've sent you an email with a reset link")
                    }
                    else{
                        errors.push("You've already received an email with a reset link")
                    }
                }
                else{
                    errors.push("Your account isn't verified")
                }
            }
            else{
                errors.push("Your account doesn't exist")
            }
        }
        success.map(success => {
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, success))
        })
        errors.map(error => {
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
        })
        res.Redirect(req.Url.pathname)
        next()
    }
};