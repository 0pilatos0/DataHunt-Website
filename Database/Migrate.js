const Database = require("../Core/Database/Database");
const MySQL = require("../Core/Database/MySQL");
const Profile_Pictures = require("./Migrations/Profile_Pictures");
const Users = require("./Migrations/Users");

MySQL.connect();

Database.create(process.env.DB);

new Users()
new Profile_Pictures()