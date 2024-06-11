const mongoose = require('mongoose');

// Define the Image schema
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: {
            type: Buffer,
        },
        contentType: {
            type: String,
        }
    }
});

// Create the model from the schema
const ImageModel = mongoose.model('ImageModel', imageSchema);

// Export the model
module.exports = ImageModel;
