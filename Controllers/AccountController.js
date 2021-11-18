const Controller = require('../core/Controller');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Mailer = require('../Core/Mailer');
const Request = require('../Core/Request');
const Response = require('../Core/Response');
const Salter = require('../Core/Salter');
const {randomString} = require('../Core/Utils');
const HTMLLoader = require('../Loaders/HTMLLoader');
const User = require("../Database/Models/User");
const Role = require("../Database/Models/Role");
const Profile_Picture = require("../Database/Models/Profile_Picture")

module.exports = class AccountController extends Controller{
    constructor() {
        super();
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res
     */
    static async HandleLogin(req, res){
        res.render("/account/login", {
            email: req.session.email || ""
        });
        delete req.session.email;
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleRegister(req, res){
        res.render("/account/register", {
            name: req.session.name || "",
            username: req.session.username || "",
            email: req.session.email || ""
        })
        delete req.session.name
        delete req.session.username
        delete req.session.email
    }
    
    /**
     * 
     * @param {Request} req
     * @param {Response} res 
     * @returns 
     */
     static async HandleRegisterPost(req, res){
        let errors = [];
        let verificationToken = randomString(100);
        let errorFeedback = () => {
            req.session.username = req.body.username;
            req.session.email = req.body.email;
            req.session.name = req.body.name;
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error));
            })
            res.redirect('/register');
        }
        if(req.body.name != ""){
            if(!req.body.name.match(Regex.Name)){
                errors.push(`Name can't contain numbers`);
            }
        }
        else{
            errors.push(`Name can't be empty`);
        }
        if(req.body.username != ""){
            if(!req.body.username.match(Regex.Username)){
                errors.push(`Username must be between 5 and 29 characters long`);
            }
        }
        else{
            errors.push(`Username can't be empty`);
        }
        if(req.body.email != ""){
            if(!req.body.email.match(Regex.Email)){
                errors.push(`Email must contain an '@'`);
            }
        }
        else{
            errors.push(`Email can't be empty`);
        }
        if(req.body.password != ""){
            if(!req.body.password.match(Regex.Password)){
                errors.push(`Password must be atleast 8 characters long, contain an special character and 1 number and 1 uppercase`);
            }
        }
        else{
            errors.push(`Password can't be empty`);
        }
        if(req.body.repeatPassword != ""){
            if(req.body.repeatPassword.match(Regex.password) && req.body.password != req.body.repeatPassword){
                errors.push(`Passwords must be the same`);
            }
        }
        else{
            errors.push(`Repeat password can't be empty`);
        }
        if(errors.length > 0) return errorFeedback();
        let userId = await User.findId({
            where: {
                username: req.body.username
            }
        });
        if(userId){
            errors.push(`User with username ${req.body.username} already exists`);
            return errorFeedback();
        }
        userId = await User.findId({
            where: {
                email: req.body.email
            }
        });
        if(userId){
            errors.push(`User with email ${req.body.email} already exists`);
            return errorFeedback();
        }
        await User.create({
            create: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: Salter.HashPassword(req.body.password),
                verifytoken: verificationToken
            }
        });
        let html = HTMLLoader.Read(`${__dirname}/../Mail/activationMail.html`).html;
        html = HTMLLoader.Replace(html, {
            url: `${Utils.URL}/verify?token=${verificationToken}`,
            username: req.body.username
        });
        await Mailer.SendMail({
            to: req.body.email,
            subject: 'DataHunt user registration',
            html: html
        });
        req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You now received an email with a verification link to verify your account`));
        res.redirect('/login');
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
     static async HandleRegisterPost(req, res){
        let errors = []
        let verificationToken = randomString(100);
        let errorFeedback = () => {
            req.session.username = req.body.username
            req.session.email = req.body.email
            req.session.name = req.body.name
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            res.redirect('/register')
        }
        if(req.body.name != ""){
            if(!req.body.name.match(Regex.Name)){
                errors.push(`Name can't contain numbers`)
            }
        }
        else{
            errors.push(`Name can't be empty`)
        }
        if(req.body.username != ""){
            if(!req.body.username.match(Regex.Username)){
                errors.push(`Username must be between 5 and 29 characters long`)
            }
        }
        else{
            errors.push(`Username can't be empty`)
        }
        if(req.body.email != ""){
            if(!req.body.email.match(Regex.Email)){
                errors.push(`Email must contain an '@'`)
            }
        }
        else{
            errors.push(`Email can't be empty`)
        }
        if(req.body.password != ""){
            if(!req.body.password.match(Regex.Password)){
                errors.push(`Password must be atleast 8 characters long, contain an special character and 1 number and 1 uppercase`)
            }
        }
        else{
            errors.push(`Password can't be empty`)
        }
        if(req.body.repeatPassword != ""){
            if(req.body.repeatPassword.match(Regex.password) && req.body.password != req.body.repeatPassword){
                errors.push(`Passwords must be the same`)
            }
        }
        else{
            errors.push(`Repeat password can't be empty`)
        }
        if(errors.length > 0) return errorFeedback()
        let userId = await User.findId({
            where: {
                username: req.body.username
            }
        })
        if(userId){
            errors.push(`User with username ${req.body.username} already exists`)
            return errorFeedback()
        }
        userId = await User.findId({
            where: {
                email: req.body.email
            }
        })
        if(userId){
            errors.push(`User with email ${req.body.email} already exists`)
            return errorFeedback()
        }
        await User.create({
            create: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: Salter.HashPassword(req.body.password),
                verifytoken: verificationToken
            }
        })
        let html = HTMLLoader.Read(`${__dirname}/../Mail/activationMail.html`).html
        html = HTMLLoader.Replace(html, {
            url: `${Utils.URL}/verify?token=${verificationToken}`,
            username: req.body.username
        })
        await Mailer.SendMail({
            to: req.body.email,
            subject: 'DataHunt user registration',
            html: html
        })
        req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You now received an email with a verification link to verify your account`))
        res.redirect('/login')
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
            req.session.email = req.body.email
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            res.Redirect(`${req.Url.pathname}${req.Url.search}`)
        }
        if(req.body.email == ""){
            errors.push(`Email can't be empty`)
        }
        if(req.body.password == ""){
            errors.push(`Password can't be empty`)
        }
        let user = await User.find({
            where:{
                email: req.body.email
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
                if(!Salter.VerifyPassword(req.body.password, user.password)){
                    errors.push("Your username or password is incorrect")
                }
            }
        }
        else if(errors.length == 0){
            errors.push("Your username or password is incorrect")
        }
        let roles = await Role.select({
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
        let profilePicture = await ProfilePicture.find({
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
    static async HandleVerification(req, res){
        let verifytoken = req.Url.vars.token
        let errors = []
        let success = []
        if(!verifytoken) {
            errors.push("There was no token provided")
        }
        let user = await User.find({
            where: {
                verifytoken
            }
        });
        if(user != false){
            await User.update({
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
        res.redirect('/')
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandlePasswordReset(req, res){
        let errors = []
        let resettoken = req.Url.vars.token
        req.session.url = `${req.Url.pathname}${req.Url.search}`
        req.session.token = resettoken

        let handleErrors = () => {
            errors.map(error => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
            })
            if(errors.length > 0){
                res.redirect('/')
            }
        }

        if(!resettoken) {
            errors.push("There was no token provided")
            return handleErrors()
        }
        let user = await User.find({
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
        errors = []
        let success = []
        if(req.body.password != ''){
            if(!Regex.Password.test(req.body.password)){
                errors.push(`Password ${passwordMessage}`)
            }
        }
        else{
            errors.push("Password must be filled in")
        }
        if(req.body.repeatPassword != ''){
            if(!Regex.Password.test(req.body.repeatPassword)){
                errors.push(`Repeat password ${passwordMessage}`)
            }
        }
        else{
            errors.push("Repeat password must be filled in")
        }
        let user = await User.find({
            where:{
                resettoken: req.session.token
            }
        })
        if(user != false){
            if(Salter.VerifyPassword(req.body.password, user.password)){
                errors.push("Password can't be the same as your old password")
            }
        }
        else{
            errors.push(`User with reset token '${req.session.token}' could not be found`)
        }
        if(req.body.password != req.body.repeatPassword){
            errors.push("Passwords don't match")
        }
        if(errors.length == 0){
            let hashedPassword = Salter.HashPassword(req.body.password)
            await User.update({
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
            res.redirect(req.session.url)
        }
        if(success.length > 0){
            success.map(success => {
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, success))
            })
            res.redirect('/')
        }
        delete req.session.url
        delete req.session.token
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleForgotPassword(req, res,){
        res.render('/account/forgotpassword')
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleForgotPasswordPost(req, res){
        let errors = []
        let success = []
        if(req.body.email == ''){
            errors.push(`Email can't be empty`)
        }
        else{
            if(!req.body.email.match(Regex.Email)){
                errors.push(`Email must contain an '@'`)
            }
        }
        if(errors.length == 0){
            let user = await User.find({
                where: {
                    email: req.body.email
                }
            })
            if(user != false){
                if(user.verified){
                    if(user.resettoken == null){
                        let token = randomString(100);  
                        await User.update({
                            where: {
                                email: req.body.email
                            },
                            set: {
                                resettoken: token
                            }
                        })
                        let htmlData = HTMLLoader.Read("./Mail/resetPasswordMail.html").html
                        htmlData = htmlData.replace('{{url}}', `http://${process.env.HOST}:${process.env.PORT}/resetpassword?token=${token}`)
                        htmlData = htmlData.replace('{{username}}', user.username)
                        await Mailer.SendMail({
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
        res.redirect(req.Url.pathname)
    }
}