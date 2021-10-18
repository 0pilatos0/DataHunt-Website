const Controller = require('../Core/Controller');
const User = require('../Models/User');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Request = require('../Core/Request');
const Response = require('../Core/Response');
const fs = require('fs');
const path = require('path');
const File = require('../Models/File');

module.exports = class AdminController extends Controller{
    constructor() {
        super()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleAdmin(req, res, next){
        res.Render("/views/admin/admin", {
            admin: req.session.user.username
        });
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleUpload(req, res, next){
        res.Render("/views/admin/upload", {
            admin: req.session.user.username
        });
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleUploadPost(req, res, next){
        req.data.customName = `${req.data.customName}${path.extname(req.data.name)}`
        let errors = []
        if(req.data.file == ""){
            errors.push("File can't be empty")
        }
        else{
            let name = req.data.customName == path.extname(req.data.name) ? req.data.name : req.data.customName
            //fs.writeFileSync(name, req.data.file, 'base64')
            await File.Create({
                create: {
                    name,
                    file: Buffer.from(req.data.file, 'base64')
                }
            })
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `Successfully uploaded ${name}`))
        }
        errors.map(error => {
            req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.ERROR, error))
        })
        res.Redirect('/admin/upload')
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */

    static async HandleFiles(req, res, next){
        let file = await File.Last({})
        res.WriteHead(200, {'Content-Type': 'application/pdf'})
        res.Send(file.file)
        next()
    }
};