const File = require("../models/FIle");
const cloudinary = require("cloudinary").v2;
//localfileupload Handler
exports.localFileUpload = async (req,res) =>{
    try {
        const file= req.files.file;
        
        //Path where file will be stored

        let path = __dirname+"/files/"+ Date.now()+ `.${file.name.split('.')[1]}`;
        file.mv(path, (err)=>{
            console.log(err);

        });
        res.json({
            success:true,
            message: "File uploaded successfully",
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Server error",
            message:err.message,
            
        })
    
    }
};
function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}
async function uploadFiletoCloudinary(file, folder,quality){
    const options= {folder};
    if(quality){
        options.quality=quality;
    }
    options.resource_type= "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload= async (req,res)=>{
 
    try{
        const {name, tags, email}= req.body;
        const file = req.files.imageFile;

        //Validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType= file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File type not supported",
            })
        }

        const response = await uploadFiletoCloudinary(file, "Images");
        console.log(response)
        const fileData= await File.create({
            name,
            tags,
            email,
            imageUrl : response.url,
        });

        res.json({
            success:true,
            imageUrl: response.url,
            message: "Image uploaded successfully"
        })
    }
    catch(err){
        console.error(err);
        res.status(400).json({
          success: false,
          message: "Something went wrong"
        })
    };
};
exports.videoUpload = async (req, res) => {
    try{
        const {name, tags, email}= req.body;
        const file = req.files.videoFile;

        //Validation
        const supportedTypes = ["mp4","mov"];
        const fileType= file.name.split(".")[1].toLowerCase();
        console.log(file);
        if(!isFileTypeSupported(fileType, supportedTypes) || file.bytes>100000000){
            return res.status(400).json({
                success:false,
                message: "File type not supported",
            })
        }

        const response = await uploadFiletoCloudinary(file, "Images");
        console.log(response)
        const fileData= await File.create({
            name,
            tags,
            email,
            videoUrl : response.url,
        });

        res.json({
            success:true,
            videoUrl: response.url,
            message: "Video uploaded successfully"
        })
    }
    catch(err){
        console.error(err);
        res.status(400).json({
        success: false,
        message: "Something went wrong"
        })
    }

};
exports.imageReducerUpload= async (req,res)=>{
    try{
        const {name, tags, email}= req.body;
        const file = req.files.imageFile;

        //Validation
        const supportedTypes = ["mp4","mov","jpg","jpeg","png"];
        const fileType= file.name.split(".")[1].toLowerCase();
        console.log(file);
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File type not supported",
            })
        }

        const response = await uploadFiletoCloudinary(file, "Images",20);
        console.log(response)
        const fileData= await File.create({
            name,
            tags,
            email,
            imageUrl : response.url,
        });

        res.json({
            success:true,
            imageUrl: response.url,
            message: "File uploaded successfully"
        })

    }
    catch(err){
        console.error(err);
        res.status(400).json({
        success: false,
        message: "Something went wrong"
        })

    }
}
