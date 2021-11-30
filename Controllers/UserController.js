const Controller = require('../Core/Controller');
const Regex = require('../Core/Regex');
const Salter = require('../Core/Salter');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Request = require('../Core/Request');
const Response = require('../Core/Response');
const Profile_Picture = require('../Database/Models/Profile_Picture')
const fs = require('fs')

module.exports = class UserController extends Controller{
    constructor() {
        super('')
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleProfile(req, res, next){
        let profilePicture = await Profile_Picture.Find({
            where: {
                user_id: req.session.user.id
            }
        })
        res.Render("/views/user/profile", {
            name: req.session.user.name || "",
            username: req.session.user.username || "",
            email: req.session.user.email || "",
            action: profilePicture ? "Change" : "Upload",
            script: `
                <script>
                    ${profilePicture ? "" : `currentProfilePicture.style.display = "none"`}
                    ${profilePicture ? "" : `currentProfilePictureHolderParent.style.display = "none"`}
                </script>
            `,
            profilePicture: profilePicture?.image || ""
        })
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleProfilePicturePost(req, res, next){
        if(req.data.picture == ""){
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, `You can't upload an empty profile picture`))
        }
        else{
            let size = Buffer.from(req.data.picture.substr(23), 'base64').byteLength
            if(size <= 256*256*24){
                let profilePictureID = await Profile_Picture.FindId({
                    where: {
                        user_id: req.session.user.id
                    }
                })
                if(profilePictureID == false){
                    await Profile_Picture.Create({
                        create: {
                            user_id: req.session.user.id,
                            image: req.data.picture
                        }
                    })
                    req.session.user.profilePicture = req.data.picture
                    req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You successfully uploaded your profile picture`))
                }
                else{
                    await Profile_Picture.Update({
                        where: {
                            user_id: req.session.user.id
                        },
                        set: {
                            image: req.data.picture
                        }
                    })
                    req.session.user.profilePicture = req.data.picture
                    req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You successfully changed your profile picture`))
                }
            }
            else{
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, `Your profile picture can't be bigger than 256 * 256 pixels`))
            }
        }
        res.Redirect('/profile')
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleChangeAccountPost(req, res, next){
        console.log(req.data)
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleDeleteProfilePicture(req, res, next){
        if(req.session.user.profilePicture){
            delete req.session.user.profilePicture
            await Profile_Picture.Delete({
                where: {
                    user_id: req.session.user.id
                }
            })
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You successfully deleted your profile picture`))
        }
        res.Redirect('/profile')
        next()
    }
}