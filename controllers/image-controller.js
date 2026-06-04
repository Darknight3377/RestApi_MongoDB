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

const fetchAllImages = async (req, res) => {
    try {
        const page = parseInt(req?.query?.page) || 1;
        const limit = parseInt(req?.query?.limit) || 5;
        const skip = (page-1)*limit;
        const sortBy = req?.query?.sortBy || 'createdAt';
        const sortOrder = req?.query?.sortOrder === 'asc' ? 1 : -1;

        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
        if(images){
            res.status(200).json({
                sucess: true,
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages,
                data: images
            })
        }
    } catch(e) {
        return res.status(500).send({
                success: true,
                message: `Something went wrong, ${e}`
        })
    }
}

module.exports = {
    uploadImage,
    deleteImage,
    fetchAllImages
}