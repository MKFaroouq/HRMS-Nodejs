require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")    
// const bcrypt = require("bcrypt")
// const validator=require("validator");
const app=express()

app.use(express.json()) // middleware to understand json file

// routes & controller:
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const departmentRoutes = require('./routes/departmentRoutes');
app.use('/api/departments', departmentRoutes);
app.use('/api/departments', require('./routes/departmentRoutes'));
// const leaveController = require('../controllers/leaveController');
app.use('/api/leaves', require('./routes/leaveRoutes'));


const port = process.env.port || 3000



// data base connection
async function dbConnection(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/hrms")
        console.log("Connected to DB")
    }
    catch(err){
        console.log(err)
    }
}

// revoking the function
dbConnection();


app.listen(port, () => {
  console.log(`listening on port ${port}
}`)
})



