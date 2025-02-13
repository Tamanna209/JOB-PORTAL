import { User } from "../models/user.model.js";
import  bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
export const register= async(req, res)=>{
    try{

       const {fullName, email, phoneNumber , password, role}= req.body;

       if(!fullName || !email || !phoneNumber || !password || !role){
        return res.status(400).json({
            msg:'Something is missing, please fill all the fields',
            success:false
        });
       }

       const user = await User.findOne({email});
       if(user){
        return res.status(400).json({
            msg:'User already exist with this mail',
            success:false
        })
       };
    
     const hashPassword = await bcrypt.hash(password , 10);

     await User.create({
        fullName, 
        email, 
        phoneNumber, 
        password:hashPassword,
        role,
     })
     res.json(201).json({
        msg:'Account Created Successfully',
        success:true
     })
    }catch(err){
    console.log(err);
    }
}

//login api
export const login= async(req, res)=>{
  try{

    const {email  , password , role}= req.body;

    if(!email || !password || !role){
        res.status(400).send({
            msg:"Fill all the fields",
            success:false
        })
    }
    let user= await User.findOne({email});

    if(!user){
        return res.status(400).json({
            msg:"Incorrect email or password",
            success:false
        })
    }
    const isPasswordMatch = await  bcrypt.compare(password , user.password);

    if(!isPasswordMatch){
        return res.status(400).json({
            msg:"Incorrect email or password",
            success:false
        })
    }

    //check role is correct or not 
    if(role !== user.role){
        return res.status(400).json({
            msg:"Account doen't exist with this current role that you entered",
            success:false
        })
    };
    const tokenData = {
        userId: user._id
    }
   const token=await jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn:'1d'});

  user= {
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    phoneNumber:user.phoneNumber,
    role:user.role,
    profile:user.profile
  }
   return res.status(200).cookie("token",token , {maxAge: 1*24*60*60*1000, httpOnly:true , sameSite:'strict'}).json({
    msg:`Welcome Back ${user.fullName}`,
    user,
    success:true
   })


  }catch(err){
    console.log(err);
  }
}


//logout api

export const logout = async(req, res)=>{
  try{
    return res.status(200).cookie("token", "", {maxAge:0}).json({
        msg:'Logged out Succefully',
        success:true
    })
  }catch(err){

  }
}


//update profile
export const updateProfile= async(req, res)=>{
    try{

      const {fullName , email , phoneNumber , bio ,skills}=req.body;
      const file=req.file;
      

 //cloudinary here...


let skillsArray;
 if(skills){
     skillsArray= skills.split(",");
 }
    

      const userId= req.id; //middlweare authentication
      let user=await  User.findById(userId);

      if(!user){
        return res.status(400).json({
            msg:'User not found',
            success:false
        })
      };

      //updated data
      if(fullName){
        user.fullName = fullName
      }
      
      if(email){
        user.email=email
      }
      
      if(phoneNumber){
        user.phoneNumber=phoneNumber
      }
      
      if(bio){
        user.profile.bio=bio
      }
      
      if(skills){
      user.profile.skills=skillsArray
      }
      //resume cums cv cums letter here..

      await user.save();

      user = {
        _id: user._id,
        fullName:user.fullName,
        email: user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
        
      }

      return res.status(200).json({
        msg:'Profile updated Successfully',
        user,
        success:true
      })

    }catch(err){
      console.log(err);
      
    }
}


