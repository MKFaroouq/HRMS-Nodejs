const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        empid: { 
        type: String, 
        unique: true,
        required: true 
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String ,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["employee" ,"manager","hr"],
        default : "employee"
    },
    department:{
        type:String
    },


managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // emp -> manger
hireDate: { type: Date, default: Date.now },
},
{ timestamps: true });


module.exports = mongoose.model('User', UserSchema);