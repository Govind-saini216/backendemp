import {mongoose, model } from "mongoose";

const employeeSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
     type:String,
     require:true,
     unique:true
  },
  phone:{
    type:Number,
    require:true
  },
  department:{
    type:String,
    require:true
  },
  profileImage:{
    type:String
  },
  salary:{
    type:String,
    require:true
  },
  createdAt:{
    type:Date,
    default:new Date
  },
  updatedAt:{
    type:Date,
    default:new Date
 }
})

const EmployeModel = new model('employee',employeeSchema)

export default EmployeModel ; 