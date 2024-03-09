const express= require('express');
const app=express();

//load config from env
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());
const fileupload = require ("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}));
//import routes 
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);
//start server 
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})

//connect to database
const dbconnect = require("./config/database");
dbconnect();
const cloudinary= require("./config/cloudinary");
cloudinary.cloudinaryConnect();