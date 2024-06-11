const mongoose = require('mongoose')
const validator = require('validator')


UserModel = mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    userEmail : {
        type : String,
        unique : true,
        validate: {
            validator: validator.isEmail,
            message: 'is not a valid email'
          },
          required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    }
})

UserModel = mongoose.model('User',UserModel)

module.exports = UserModel