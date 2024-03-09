const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require("dotenv").config();
const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    imageUrl:{
        type: String,
    },
    tags:{
        type:String
    },
    email:{
        type:String,
    }

});

FileSchema.post("save", async function(doc){
    console.log(doc);
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        let info = await transporter.sendMail({
            from: `Ayush`,
            to: doc.email,
            subject: "New file created",
            html:`<h2>Hello</h2>`
        })

    }
    catch(err){



    }
});

const File= mongoose.model("File",FileSchema);
module.exports = File;