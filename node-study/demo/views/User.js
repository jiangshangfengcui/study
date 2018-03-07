var UserClass = require('./UserClass.js');

function User(name, age, friends) {
	UserClass.call(this, name, age, friends);
}

User.prototype =new UserClass();

User.prototype.sayFriends = function() {
	return this.friends;
}


module.exports = User;
