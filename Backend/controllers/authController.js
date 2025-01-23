const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const UserModel = require("../models/user-model");

const signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin, picture } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
            picture: picture || ''
        });
        await newUser.save();
        res.status(201).json({
            message: "Signup successfully",
            success: true
        });
    } catch (err) {
        console.error('Signup error:', err); // Log the error
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({
                message: 'Auth failed: email or password is wrong',
                success: false
            });
        }

        const jwtToken = generateToken(user);

        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            picture: user.picture 
        });
    } catch (err) {
        console.error('Login error:', err); // Log the error
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    signup,
    login
}
