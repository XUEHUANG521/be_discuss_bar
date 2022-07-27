const User = require('../model/user');
const bcrypt = require('bcrypt');

const SignUpNewUser = async(req, res) => {
	const {username, email, password} = req.body;
	if(!username || !email) {
		res.status(400).json({'message': 'Username  and email are required'});
	} else if (!password) {
		res.status(400).json({'message':'Password is required'});
	}

	const result = await User.findOne({username: username});
	if(result) return res.status(400).json({'message': 'User create failed'});

	try {
		const encryptedPWD = await bcrypt.hash(password, 10);

		await User.create({
			'username' : username,
			'email' : email,
			'password': encryptedPWD
		})
		console.log('Register success')
		res.status(200).json({'success' : `New User ${username} Created`});
	} catch(error) {
		res.status(500).json({'error': error.message});

	}

}

module.exports = {SignUpNewUser};