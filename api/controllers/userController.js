import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export function getUserProfile(req,res,next){
    res.status(200).json({
        success:true,
        msg:req.user
    })
}