const express = require('express');
const authRoutes = express.Router();
const UserModel = require('../models/userModel');
const bcryptjs = require('bcryptjs')

authRoutes.post('/addUser', async (req, res) => {
    const { userName, userEmail, password } = req.body;

    try {
        const existingUserName = await UserModel.findOne({ userName });

        if (existingUserName) {
            return res.status(400).send('Change UserName, this UserName already exists.');
        }

        const existingUserEmail = await UserModel.findOne({ userEmail });

        if (existingUserEmail) {
            return res.status(400).send('Change UserEmail, this UserEmail is already associated with an existing user.');
        }

        const hashpassword = await bcryptjs.hash(password,8)

        const user = new UserModel({
            userName: userName,
            userEmail: userEmail,
            password: hashpassword
        });

        // Corrected the handling of the asynchronous save operation
        const savedUser = await user.save();

        return res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = authRoutes;
