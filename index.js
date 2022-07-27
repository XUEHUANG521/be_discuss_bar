const express = require('express');
const app = express();
const connectDB  = require('./config/db');
const userRouter = require('./routes/userRouter');
const SignUpRouter = require('./routes/SignUpRouter');
const LoginRouter = require('./routes/LoginRouter');
const PostRouter = require('./routes/postRouter');
const cors = require('cors');
const corsOption = require('./config/corsOptions');
const cookieParser  =  require('cookie-parser');
const JWTverify = require('./middleware/verification_JWT');

connectDB();

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/signup', SignUpRouter);
app.use('/login', LoginRouter);

// app.use(JWTverify);
app.use('/users', userRouter);
app.use('/posts', PostRouter);



app.listen(8000, ()=> {
	console.log("Server is running")
});
