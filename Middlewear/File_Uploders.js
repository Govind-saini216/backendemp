import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Create Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',           // Cloudinary folder where files will be stored
    format:async(req, file) => 'png',
    // format: async (req, file) => 'png': यह लाइन अपलोड की गई फ़ाइल का फ़ॉर्मेट सेट करती है। यह सभी फ़ाइलों को 'png' फ़ॉर्मेट में कनवर्ट करती है, चाहे उनकी मूल फ़ॉर्मेट कुछ भी हो।
    public_id:(req,file)=> file.originalname.split('.')[0] +""
  },
});

// Initialize Multer with Cloudinary Storage
const upload = multer({ storage: storage });

export default  upload ; // 