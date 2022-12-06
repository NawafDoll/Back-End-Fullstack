import { User } from "@prisma/client";
import { Request, Response } from "express";
import { regsterSchema } from "../zodSchema/user.zodSchema";
import * as jwt from 'jsonwebtoken'
import * as argon2 from 'argon2'
import { prisma } from "../config/db";

export const loginHandler = async(req:Request,res:Response)=>{
  try{
    const {username,password} = req.body as User;
    const user = await prisma.user.findUnique({
        where:{ username }
    })
    if(!user){
        return res.status(400).json({message:'Wrong username or password'})
    }
    const isMatched = await argon2.verify(user.password,password)
    if(!isMatched){
        return res.status(400).json({message:'wrong username or passsword'})
    }
    
    const token = jwt.sign({id:user.id,username:user.username},process.env.JWT_SECERT as string,
      {
        expiresIn: '5 days',
      }
      );
    return res.status(201).json({message:`welcome back !`,token})

}catch(err){
console.log(err)
res.status(500).json({message:'Servsr Error'})
}
};





export const regsterHandler = async (req:Request,res:Response)=>{
    try{

    
    const {username , password,email} = req.body as User;
    const hashedPassword = await argon2.hash(password)
    
    await prisma.user.create({
        data:{
            username,
            password:hashedPassword,
            email,
        }
    })
    return res.status(201).json({message:'add new user !'})
}catch(e){
    return res.status(400).json({message:'issue with your input'})
}
}