const jwt = require('jsonwebtoken');

const verify_JWT = (req, res, next) => {
	const request_header = req.headers.authorization || req.headers.authorization;
	console.log(request_header);
	if(request_header == undefined) {
		res.status(400).json({'message' : 'no header'});
	}
	if(!request_header.startsWith('Bearer')) {
		res.sendStatus(404)
	}
	const token = request_header.split(' ')[1];
	jwt.verify(
		token,
		process.env.TOKEN_SECRET,
		(err, decoded) => {
		if(err) return res.status(403).json({'error': 'You are not authorizated'});

		console.log(decoded.username);
		req.user = decoded.username;
		next();
		}
	)

}

module.exports = verify_JWT;
