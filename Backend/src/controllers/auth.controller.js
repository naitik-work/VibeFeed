const userModel= require("../models/user.model");
const crypto= require("crypto");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");


async function registerController(req,res){

    const {username, password, email, bio, profile_image}= req.body;

    const isUserAlreadyExists= await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists."+(isUserAlreadyExists.email===email?"Email already exists":"Username already exists.")
        })
    }

    const hash= await bcrypt.hash(password,10)//hashing on the password.

    const user= await userModel.create({
        username,
        email,
        bio,
        profile_image,
        password: hash
    })

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET || "vibefeed_default_secret_key_2026",
      { expiresIn: "1d" }
    );

    res.cookie('token', token);
    
    res.status(201).json({
        message:"User registered successfully.",
        username: user.username,
        email: user.email,
        bio: user.bio,
        profile_image: user.profile_image

    })
}

async function loginController(req,res){
    const {username,email,password}= req.body;

    const user= await userModel.findOne({
        $or: [
            {username: username},
            {email: email}
        ]
    }).select("+password"); //select +password is used to include the password field in the query result, because we have set select: false in the user model for the password field. This is necessary because we need to compare the provided password with the hashed password stored in the database.

    if(!user){
       return res.status(400).json({
            message: "Username or email is not registered."
        })
    }
    
    const userPassword= await bcrypt.compare(password,user.password);

    if(!userPassword){
        return res.status(401).json({
            message: "password invalid"
        })
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET || "vibefeed_default_secret_key_2026",
      { expiresIn: "1d" }
    );

    res.cookie('token',token);

    res.status(201).json({
        message:"Logged in!",
        user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profile_image: user.profile_image
        }

    })


}

async function getMeController(req,res){
    const userId= req.user.id;
    const user= await userModel.findById(userId);

    res.status(200).json({
        message: "User data fetched successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
    }


module.exports= {
    registerController,
    loginController,
    getMeController
}