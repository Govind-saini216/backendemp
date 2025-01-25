import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const mongoDbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("server is connect")
  }

  catch (error) {
   console.log("mogo db connection error",error) 
  }

}

export default mongoDbConn;