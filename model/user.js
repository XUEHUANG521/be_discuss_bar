const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	username: {
		type:String,
	},

	email: {
		type: String,
		unique: true,
		require: true,
		trim: true
	},

	password: {
		type: String,
		required: true,
	},
	
	refreshToken: String


})
const User =  mongoose.model("User", UserSchema);

UserSchema.pre('save',  async function(next) {
	const user = this;

	if(user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
})

UserSchema.statics.findByCredentials = async (input, password) => {
	const user  = await User.findOne({email:input});
	if(!user) {
		//Cannot find match user based on the email in record.
		return user;
	}

	const isMatched = await bcrypt.compare(password, user.password);

	if(isMatched) {
		return true;
	} else {
		return false;
	}

}

module.exports = User;