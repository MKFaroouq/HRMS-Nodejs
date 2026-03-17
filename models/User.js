const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
        require:true
    },
    role:{
        type:String,
        enum:["employee" , "manager","hr"],
        //default : "employee"
    },

department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },// emp -> departmant
managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // emp -> manger
hireDate: { type: Date, default: Date.now },
},
{ timestamps: true });


module.exports = mongoose.model('User', UserSchema);