const Database = require("../Core/Database/Database");
const MySQL = require("../Core/Database/MySQL");
const Profile_Pictures = require("./Seeders/Profile_Pictures");
const Users = require("./Seeders/Users");

MySQL.connect(process.env.DB);

Users.Seed({
    username: "Pizza"
});

Profile_Pictures.Seed({
    user_id: 123,
    picture: "123rokekmfgjnht4"
});