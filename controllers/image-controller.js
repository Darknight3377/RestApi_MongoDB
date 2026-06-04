const Image = require('../models/image');
const {uploadToCloudinary} = require('../helpers/cloudinary.helper');
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImage = async(req,res ) => {
    try{
        if(!req.file){
           return res.status(400).send({
            sucess: false,
            message: 'File is missing'
        }) 
        }

        const {url, publicId} = await uploadToCloudinary(req.file.path);
        //store the details in mongo db
        const newImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });
        await newImage.save();

        //remove file from local folder
        fs.unlinkSync(req.file.path);

        return res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data : newImage
        })
    } catch(e) {
        console.log(e);
        return res.status(500).send({
            sucess: false,
            message: 'Something went wrong'
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const imageIdToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;
        const image = await Image.findById(imageIdToBeDeleted);
        if(!image) {
            return res.status(404).send({
                success: false,
                message: 'Image not found'
            })
        }
        //check if image uploaded by same user who is deleting
        if(image.uploadedBy.toString()!== userId){
            return res.status(403).send({
                success: false,
                message: 'You are not authorized to delete as you are not owner of this'
            })
        }

        //delete from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        await Image.findByIdAndDelete(imageIdToBeDeleted);
         return res.status(200).send({
                success: true,
                message: 'Image deleted successfully'
        })
    } catch (e) {
        return res.status(500).send({
                success: true,
                message: 'Something went wrong'
        })
    }
}

module.exports = {
    uploadImage,
    deleteImage
}