const Controller = require('../Core/Controller');
const Regex = require('../Core/Regex');
const Salter = require('../Core/Salter');
const User = require('../Models/User');

module.exports = class UserController extends Controller{
    constructor() {
        super('')
    }

    static async HandleVerification(req, res){
        let verifytoken = req.Url.vars.token;
        if(!verifytoken) {
            res.Redirect('/');
            res.End();
            //TODO create error with text "There was no token provided"

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
                    verifytoken: "NULL",
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
            //TODO create error with text "User with that verification token couldn't be found"
        }
    }

    static async HandlePasswordReset(req, res){
        res.Render("/views/resetpassword", {
            email: 'test',
            resettoken: 'pizza'
        })
        // let resettoken = req.Url.vars.token
        // if(!resettoken) {
        //     res.Redirect('/')
        //     res.End()
        //     //TODO create error with text "There was no token provided"
        //     return
        // }
        // let user = await User.Find({
        //     where: {
        //         resettoken
        //     }
        // })
        // if(user != false){
        //     res.Render("/views/resetpassword", {
        //         email: user.email,
        //         resettoken
        //     }) //page with reset password input and everything
        // }
        // else{
        //     res.Redirect('/')
        //     res.End()
        //     //TODO create error with text "User with that resetpassword token couldn't be found"
        // }
    }

    static async HandlePasswordResetPost(req, res){
        let errors = []
        if(req.data.password != ''){
            if(!Regex.Password.test(req.data.password)){
                errors.push("Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character")
            }
        }
        else{
            errors.push("Password must be filled in")
        }
        if(req.data.repeatPassword != ''){
            if(!Regex.Password.test(req.data.password)){
                errors.push("Repeat password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character")
            }
        }
        else{
            errors.push("Repeat password must be filled in")
        }
        console.log(errors)
        if(errors.length == 0){
            if(req.data.password != req.data.repeatPassword){
                errors.push("Passwords aren't the same")
            }
            else{
                let hashedPassword = Salter.HashPassword(req.data.password)
                await User.Update({
                    set:{
                        resettoken: null,
                        password: hashedPassword
                    },
                    where:{
                        resettoken: req.data.resettoken
                    }
                })
                //Show the user that the password has changed
                
                //Change password data in database
            }
        }
        else{
            //Send errors back and show them
        }
        res.Redirect('/resetpassword')
        console.log(req.data)
    }
}