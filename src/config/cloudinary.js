const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dh0hicqkr',
    api_key: process.env.API_KEY_CLOUDY,
    api_secret: process.env.API_KEY_CLOUDY_SECRET	
})


module.exports = cloudinary