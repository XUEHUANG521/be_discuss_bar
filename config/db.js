const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:cIIcEb7ZeR6M2Wd9@xdiscussion.nus32.mongodb.net/?retryWrites=true&w=majority', 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB