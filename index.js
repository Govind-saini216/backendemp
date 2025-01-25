import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoDbConn from './Model/Db.js';
import Routers from './Routes/Employees_routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// make a port section
const port =  process.env.PORT || 8080 ;

// yeh backend data ko conver krne k kaam aata hy ya parse krta hy
// Middleware to parse JSON data
app.use(bodyParser.json());
// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// cors policy api get data require
app.use(cors())

// mongo db fulnction is calling
mongoDbConn();

// create a main home page api
app.get('/',(req,res) =>{
  res.json({message:"your home page is"})
})

// defalt api all routers
app.use('/api/employess',Routers);

// make a server
app.listen(port,(req,res)=>{
   console.log(`server is running is port ${port}`)
})