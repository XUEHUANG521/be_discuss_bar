const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
	const users = await User.find();
	console.log('here is the result');
	if(!users) return res.status(204).json({'message': 'no Users found'});
	// console.log('here is the result');
	res.status(200).json(users);
}

const getUser = async (req, res) => {
	if(!req.body?.email) return res.status(400).json({'message': 'Email required'});
	const result = await User.findOne({email: req.body.email}).exec();
	if(!result) return res.status(204).json({'message': `Email ${req.body.email} Not found`});

	res.json(result);
}


const deleteUser = async (req, res) => {
	if(!req.body?.email) return res.status(400).json({"message": 'Email required'});
	const user = await User.findOne({email: req.body.email});
	if(!user) {
		return res.status(400).json({'message' : 'No user Found'})
	} else {
		const result = await user.deleteOne({email: req.body.email});
		res.json(result);
	}
}

module.exports = {
	getAllUsers,
	deleteUser,
	getUser,
} 