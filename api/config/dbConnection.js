import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { MONGO_URL } from "../config/config.js";
const uri = MONGO_URL
const client = new MongoClient(uri);
const database = client.db("insertDB");

export const connectDb = async ()=>{
    await mongoose.connect(uri,{
    });
    console.log("DB connected");
}



 export default database