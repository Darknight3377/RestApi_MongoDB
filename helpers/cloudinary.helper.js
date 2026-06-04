const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async(filePath) => {
    try{
        const res = await cloudinary.uploader.upload(filePath);
        return {
            url: res.secure_url,
            publicId: res.public_id
        };
    } catch(e){
        console.log('Error while uploading to cloudinary', e);
        throw new Error('Error while uploading to cloudinary');
    }
}

module.exports = {
    uploadToCloudinary
}