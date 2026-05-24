const cloudinary = require('cloudinary').v2;
const CloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'UniRetrieve',
        allowedFormats: ['jpg','jpeg','png'],
    },
});

let delImageCloudinary = async (req,res,next)=>{
    await cloudinary.uploader
    .destroy(req.body.imageFilename, {resource_type: 'image', invalidate: true})
    .then(result => console.log(result));
    next();
  }

module.exports = {cloudinary, storage, delImageCloudinary};