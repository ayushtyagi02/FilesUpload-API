const mongoose= require('mongoose');

require("dotenv").config();
const DATABASE_URL= process.env.DATABASE_URL;
const dbconnect = ()=>{
    mongoose.connect(DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> console.log('Connection Succesful with database')).
    catch((err)=> {console.log("Issue in Db Connection");
    console.error(err.message);
    process.exit(1);})
};
module.exports = dbconnect;
