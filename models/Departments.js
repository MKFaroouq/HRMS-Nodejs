const mongoose = require("mongoose");

const departmentsSchema = new mongoose.Schema({
    name: 
    {
        type:String,
        required:true,
        unique:true,
    },

    // managerId: 
    // { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User' 
    // },

}, { timestamps: true });

module.exports = mongoose.model("Departments", departmentsSchema);