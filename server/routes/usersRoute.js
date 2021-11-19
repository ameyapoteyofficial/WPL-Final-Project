const express = require('express');

const usersRoute = express.Router();
const User = require('../models/User');
const error = require('../middleware/errorMiddlewareHandler');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utilities/generateTokens');

//registering users
usersRoute.post('/register', asyncHandler(async (req,res) => {
        const {Name,Email,Password} = req.body;
        const userExists = await User.findOne({Email : Email});
        if(userExists){
            throw new Error('User Exists');
        }
        const user = await User.create({Name,Email,Password});
        res.json({
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            Token: generateToken(user._id),
            // Password: userExists.Password,
        });
    
})
);

//User Login
usersRoute.post('/login', asyncHandler( async (req,res)=>{
    const {Email, Password} = req.body;
    const userExists = await User.findOne({ Email});
    if(userExists && ( await userExists.isPasswordCorrect(Password))){
        res.status(200);
        res.json({
            _id: userExists._id,
            Name: userExists.Name,
            Email: userExists.Email,
            Token: generateToken(userExists._id),
            // Password: userExists.Password,
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid Credentials/ User does not exist!!');
    }
}));

module.exports = usersRoute;