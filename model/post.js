const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	postId: {
		type: String,
		require: true,
	},
	creator: {
		type: String,
		require: true,
	},
	title: {
		type:String,
	},
	category: {
		type:String,
		default: 'Unknown',
	},
	content: {
		type: String,
	},
	// comment: {
	// 	type: mongoose.Schema.Types.Mixed
	// }
})

const Post =  mongoose.model("Post", PostSchema);

module.exports = Post;