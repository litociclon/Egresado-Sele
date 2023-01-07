const path = require('path');
const fs = require("fs");


const usersModels = {
    filname: path.join(__dirname, '../data/users.json'),

    getData: function() {
        return JSON.parse(fs.readFileSync(this.filname, "utf-8"));
    },

    findAll: function () {
		return this.getData();
	},

    //usuarios por mail
    findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},


}
module.exports = usersModels;