const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")    
const bcrypt = require("bcrypt")
const authRoutes = require('./routes/authRoutes');
const validator=require("validator")

const app=express()
app.use(express.json())
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000

async function dbConnection(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/hrms")
        console.log("Connected to DB")
    }
    catch(err){
        console.log(err)
    }
}

dbConnection();


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})



