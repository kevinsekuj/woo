const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.KEY,
    api_secret: process.env.SECRET,
});

/**
 * Configure storage on cloudinary for img hosting
 */
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "TouristSites",
        allowedFormats: ["png", "jpeg", "jpg"],
    },
});

module.exports = {
    cloudinary,
    storage,
};
