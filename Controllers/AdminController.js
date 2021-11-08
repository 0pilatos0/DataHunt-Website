const Controller = require('../Core/Controller');
const User = require('../Models/User');
const Feedback = require('../Core/Feedback/Feedback');
const FeedbackEnum = require('../Core/Feedback/FeedbackEnum');
const Request = require('../Core/Request');
const Response = require('../Core/Response');
const fs = require('fs');
const path = require('path');
const File = require('../Models/File');
const Role = require('../Models/Role');
const Roles = require('../Models/Roles');

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
        let errors = []
        let fileExtension = path.extname(req.data.name)
        if(fileExtension != '.pdf'){
            errors.push("File must be a .pdf file")
        }
        if(errors.length == 0){
            if(fileExtension != '.pdf') req.data.customName = `${req.data.customName}${fileExtension}`
            if(req.data.file == ""){
                errors.push("File can't be empty")
            }
            else{
                let name = req.data.customName == fileExtension ? req.data.name : req.data.customName
                //fs.writeFileSync(name, req.data.file, 'base64')
                await File.Create({
                    create: {
                        name,
                        file: Buffer.from(req.data.file, 'base64')
                    }
                })
                req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `Successfully uploaded ${name}`))
            }
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
        // res.WriteHead(200, {'Content-Type': 'application/pdf'})
        // res.Send(file.file)
        res.Render('/views/admin/files', {
            src: file.file.toString('base64')
        })
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleUsers(req, res, next){
        const maxUsers = 10
        //TODO make pages functionally from the url with var ?page=0
        let users = await User.Select({
            limit: `${maxUsers} OFFSET 0`
        })
        let allRoles = await Roles.Select({
            select: ["name", "id"]
        })
        let body = ''
        let script = '<script>'
        let doneUsers = 0
        users.map(async user => {
            let dataString = ""
            dataString += `<tr id="${user.id}">`
            dataString += `<td>${user.username}</td>`
            let assignedRoles = await Role.Select({
                joins: [
                    "INNER JOIN roles ON users_roles.role_id = roles.id"
                ],
                where: {
                    user_id: user.id
                },
                select: ["name", "users_roles.id"]
            })
            let parsedAssignedRoles = []
            assignedRoles.map(role => {

                parsedAssignedRoles.push(`<p>${role.name}</p><button id="delete-confirm-${user.id}" class="delete-button">x</button>`)
            })
            dataString += `<td>${parsedAssignedRoles.join(', ')}</td>`
            dataString += `<td><select id="${user.username}-select"><option value="">Select one</option>`
            allRoles.map(role => {
                if(!assignedRoles.some(r => r.name == role.name)){
                    dataString += `<option value="${role.id}">${role.name}</option>`
                }
            })
            dataString += `</select></td>`
            dataString += '</tr>'
            body += dataString
            body += `<form method="POST" action="/admin/users/addRole" id="${user.username}-form"><input type="hidden" name="role" id="${user.username}-role"><input type="hidden" value="${user.id}" name="user"></form>`
            script += `
                let ${user.username}select = document.getElementById('${user.username}-select')
                let ${user.username}form = document.getElementById('${user.username}-form')
                let ${user.username}role = document.getElementById('${user.username}-role')
                ${user.username}select.addEventListener('change', () => {
                    //window.location.href = window.location.href + '/addRole?id=' + ${user.username}select.value + '&user=${user.id}'
                    ${user.username}role.value = ${user.username}select.value
                    ${user.username}form.submit()
                })
            `
            doneUsers++
            if(doneUsers == maxUsers || doneUsers == users.length){
                script += '</script>'
                script += `<script type="module">
                import Modal from '/js/Modals/Modal.js'
        
        let buttonArray = document.getElementsByClassName("delete-button");
                console.log(buttonArray);
        Array.from(buttonArray).forEach(button => {
            button.onclick = function(){
                let id = button.parentElement.parentElement.id;
                let name = button.parentElement.parentElement.firstChild.innerHTML;
                let role = button.parentElement.firstChild.innerHTML;
                let titleText = "Remove role";
                let bodyText = \`Remove \${role} from \${name}?\`
                let confirm = '<button type="button" class="btn btn-primary" id="modalConfirm">Confirm</button>'
                let type = 'role';
                let action = 'delete';
                
                let request = \` var xhr = new XMLHttpRequest();
                xhr.open("POST", './users/delRole', true);

//Send the proper header information along with the request
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = function() { // Call a function when the state changes.
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        
                    }
                }
                xhr.send('action=\${action}&type=\${type}&id=\${id}')

// xhr.send(new Int8Array());
// xhr.send(document); \`
               
                Modal.Confirm(name, titleText, bodyText, confirm, type, action, id, request);
            }
        })
    </script>`
                res.Render('/views/admin/users', {
                    head: `<th>Username</th><th>Roles</th><th>Add role</th>`,
                    body,
                    script
                })
                next()
            }
        })
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleUsersRoleDeletionPost(req, res, next){
        console.log(req);
        let role = await Role.Find({
            where: {
                "users_roles.id": req.data.id
            },
            joins: [
                "INNER JOIN roles ON users_roles.role_id = roles.id",
                "INNER JOIN users ON users.id = users_roles.user_id"
            ],
            select: [
                "users.username", "roles.name", "users_roles.*"
            ]
        })
        await Role.Delete({
            where: {
                id: req.data.id
            }
        })
        req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `Successfully deleted '${role.name}' role from user ${role.username}`))
        console.log(role);
        res.Redirect('/admin/users')
        next()
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */
    static async HandleUsersRoleAddingPost(req, res, next){
        await Role.Create({
            create: {
                role_id: req.data.role,
                user_id: req.data.user
            }
        })
        let role = await Role.Find({
            where: {
                "users_roles.user_id": req.data.user,
                "users_roles.role_id": req.data.role
            },
            joins: [
                "INNER JOIN roles ON users_roles.role_id = roles.id",
                "INNER JOIN users ON users.id = users_roles.user_id"
            ],
            select: [
                "users.username", "roles.name", "users_roles.*"
            ]
        })
        req.session.feedback.push(Feedback.ShowFeedback(FeedbackEnum.SUCCESS, `Successfully added '${role.name}' role to user ${role.username}`))
        res.Redirect('/admin/users')
        next()
    }
};