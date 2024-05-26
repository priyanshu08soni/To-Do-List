const express=require('express');
const app =express();
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const dotenv=require("dotenv").config();
const PORT=process.env.PORT||4000;
const authRouter=require('./routes/authRoute');
const cookieParser=require("cookie-parser");
const morgan=require("morgan");
const cors=require("cors");
dbConnect();
app.use(morgan("dev"));
app.use(cors());

//generating response to request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/',authRouter);

//after the authentication

app.use(notFound);
app.use(errorHandler); 

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running at PORT ${PORT}`);
});