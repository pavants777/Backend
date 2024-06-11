const express = require('express')
const multer = require('multer')
const ImageRoutes = express.Router();
const ImageModel = require('../models/imageModel')



const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');


ImageRoutes.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.error(err);
            return res.status(500).send('An error occurred while uploading the image.');
        }
        else{
            if (!req.file || !req.body.name) {
                return res.status(400).send('Image file and name are required.');
            }
    
            const newImage = new ImageModel({
                name: req.body.name,
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            });
            
            newImage.save().then(()=>{res.send("Upload succesfully")}).catch(()=> res.send(`Error Message ${err}`))
        }
    })
})


ImageRoutes.get('/getImage', async (req, res) => {
    const name = req.body.name;
    try {
        const imageDoc = await ImageModel.findOne({ name: name });
        
        if (!imageDoc) {
            return res.status(400).send('Image not found');
        }

        const imageBase64 = imageDoc.image.data.toString('base64');

        // Prepare the response object
        const response = {
            _id: imageDoc._id,
            name: imageDoc.name,
            image: {
                data: imageBase64,
                contentType: imageDoc.image.contentType
            },
            __v: imageDoc.__v
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send('An internal server error occurred');
    }
});

ImageRoutes.get('/',(req,res)=>{
    res.status(200).json('Hello World')
})

module.exports = ImageRoutes