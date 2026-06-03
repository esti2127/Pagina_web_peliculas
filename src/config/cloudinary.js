const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDY_USER,
    api_key: process.env.API_KEY_CLOUDY,
    api_secret: process.env.API_KEY_CLOUDY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'some-folder-name',
        format: async (req, file) => 'jpg'
    }
})

const upload = multer({storage})

module.exports = upload