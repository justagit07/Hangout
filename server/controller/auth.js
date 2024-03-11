import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import User from "../models/user.js"
import { ApiError } from "../ApiError.js";
import fs from 'fs'
dotenv.config()

import cloudinary from 'cloudinary'
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
  });

export default  async function  register(req,res)
 {
    try
    {   
         const filepath= req.file.path

// encrypting the password into random string using bcrypt package
        const bcryptPassword=  await bcrypt.hash(req.body.password, 10)
         if(!filepath)
         {
                throw new ApiError(500,'filepath did not exist')
         }
       const imageurl=   await cloudinary.uploader.upload(filepath,{resource_type:"auto"})

        
       if(!imageurl)
             {
                    throw new ApiError(500,'cannot able to upload on cloudinary')
             }

// remove the photos from the local storage
         fs.unlink(filepath, (err) => 
         {
                if (err) console.log('Error deleting file:', err)
         }) 

// creating creating new user inthe database collection 
       
  const x=  await User.create({...req.body,password:bcryptPassword,profilePhoto:imageurl.url, lastname:'singh',impression:Math.floor(Math.random(90)*1000), viewedProfile:Math.floor(Math.random(20)*1000)})
      if(!x)
      {
        console.log('unable to cer');
        
      }

      res.status(200).json(x)
                
            }
            catch(err)
            { 
                console.log('this is the error ', err)
                return res.status(500).json(err)

    }
}