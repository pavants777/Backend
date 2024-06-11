const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const ImageRoutes = require('./Routes/imageRoutes')

const app = express()

app.use(express.json())
app.use(ImageRoutes)

const DB = process.env.DB
const Port = process.env.Port || 3000

mongoose.connect(DB).then(()=>{
    console.log('MongoDB is connected')
}).catch(()=>{
    console.log('MongoDB is not connected')
})

app.listen(Port,()=>{
     console.log('Server is on Live...')
});