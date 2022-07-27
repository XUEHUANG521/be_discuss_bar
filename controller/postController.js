const Post = require('../model/post');
const uuid =  require('uuid');

const getAllPosts = async (req, res) => {
	const posts = await Post.find();
	// console.log('here is the result');
	if(!posts) return res.status(204).json({'message': 'no Post found'});
	// console.log('here is the result');
	res.status(200).json(posts);
}

const addPost = async (req, res) => {
	const {title, content, creator, category} = req.body;
	const postId = uuid.v4();

	const result = await Post.findOne({postId: postId});

	while (result) {
		postId = uuid.v4();
		result = await Post.findOne({postId: postId});
	}
	try {
		await Post.create({
			'postId': postId,
			'title' : title,
			'content': content,
			'creator' : creator,
			'category': category
		})
		console.log('Post added success')
		res.status(200).json({'success':  `New POST ${title} added`});
	} catch (error) {
		res.status(500).json({'error': error.message});
	}


}

module.exports = {addPost, getAllPosts};