const Router = require("../Core/Router");

module.exports = class HasPermissions extends Router {
    constructor() {
        super();
        this.use((req, res, next) => {
            if(req.session.user.roles.indexOf("admin") == -1){
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, `You don't have the permissions to be here.`));
                res.redirect('/');
                return res.end();
            }
            next();
        })
    }
}