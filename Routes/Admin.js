const AdminController = require("../Controllers/AdminController");
const Feedback = require("../Core/Feedback/Feedback");
const FeedbackEnum = require("../Core/Feedback/FeedbackEnum");
const Router = require("../Core/Router");
const Account = require("./Account");

module.exports = class Admin extends Router{
    constructor() {
        super('/admin')

        this.use(Account.Authenticated)

        this.use(Admin.HasPermissions)

        this.get('', AdminController.HandleAdmin)

        this.get('/upload', AdminController.HandleUpload)

        this.post('/upload', AdminController.HandleUploadPost)
    }

    static async HasPermissions(req, res, next){
        if(req.session.user.roles.indexOf("admin") == -1){
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, `You don't have the permissions to be here.`))
            res.Redirect('/')
            return res.End()
        }
        next()
    }
}