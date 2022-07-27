const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async(req, res)=> {
	const {username,email,password} = req.body;
	if(!username || !password) return res.status(400).json({'message': 'password and username are required'})

	const userFound = await User.findOne({username: username}).exec();

	if(!userFound) return res.status(401).json({'error':'User not exist'});

	const result = await bcrypt.compare(password, userFound.password);
	console.log(userFound.password);
	console.log('result : '+ result);

	if(result) {
		const accessToken = jwt.sign(
			{
				'username': userFound.username,
			},
			process.env.TOKEN_SECRET,
			{expiresIn: '2h'}

		);

		const refreshToken = jwt.sign(
			{
				'username': userFound.username
			},
			process.env.REFRESH_TOKEN_SECRET,
			{expiresIn: '1d'}
		);
		userFound.refreshToken = refreshToken;
		await userFound.save();

		res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, samesite: 'None', maxAge: 3600000});
		res.json({'message': 'Login in successfully', 'accessToken':  accessToken});
	} else {
		res.status(400).json('access Deny');
	}

}

module.exports = {handleLogin};