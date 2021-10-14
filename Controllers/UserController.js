const Controller = require('../Core/Controller');
const Regex = require('../Core/Regex');
const Salter = require('../Core/Salter');
const User = require('../Models/User');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Request = require('../Core/Request');
const Response = require('../Core/Response');
const ProfilePicture = require('../Models/ProfilePicture');

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
    static async HandleProfile(req, res){
        if(!req.session.user){
            return res.Redirect('/login')
        }
        let profilePicture = await ProfilePicture.Find({
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
                </script>
            `,
            profilePicture: profilePicture?.image || ""
        })
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleProfilePicturePost(req, res){
        if(!req.session.user){
            return res.Redirect('/login')
        }
        let profilePictureID = await ProfilePicture.FindId({
            where: {
                user_id: req.session.user.id
            }
        })
        if(profilePictureID == false){
            await ProfilePicture.Create({
                create: {
                    user_id: req.session.user.id,
                    image: req.data.picture
                }
            })
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You successfully uploaded your profile picture`))
        }
        else{
            await ProfilePicture.Update({
                where: {
                    user_id: req.session.user.id
                },
                set: {
                    image: req.data.picture
                }
            })
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `You successfully changed your profile picture`))
        }
        res.Redirect('/profile')
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleChangeAccountPost(req, res){
        console.log(req.data)
    }
}