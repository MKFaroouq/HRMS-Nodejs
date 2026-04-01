const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const {RegesterSchemaValidation}  = require('./validations/AuthValidations')

// Register
exports.register = async (req, res) => {
    try {

        const {error , value} = RegesterSchemaValidation.validate(req.body , {
            abortEarly:false,
            stripUnknown:true
        })
        if(error){
            return res.status(404).json({msg:error.details.map(err=>err.message)})
        }
        const { empid , name, email, password, role , departmentName} = value

        // if(!empid || !name || !email  || !password || !role || !departmentName)
        //return res.status(400).json({msg:"please enter all fields"})

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "This user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            empid,
            name,
            email,
            password: hashedPassword,
            department: departmentName,
            role
        });

        await user.save(); 

        const token = jwt.sign(
        { id: user._id, role: user.role },
        'secret_key', //middleware
        { expiresIn: '1d' }
    );

        res.status(201).json({
            message: "employee registered successfully",
            token,
            user: {
                id: user.empid,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
        { id: user._id, role: user.role },
        'secret_key', 
        // { expiresIn: '1d' }
        );

        res.status(200).json({
            msg: "Logged in successfully",
            token,
            role: user.role
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



    // crud operation

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params; 
        
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) return res.status(404).json({ msg: "this user is not exist" });

        res.status(200).json({ msg: "deleted succufully", deletedUser });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; 

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        
        if (!updatedUser) return res.status(404).json({ msg: "user is not exist to be updated" });

        res.status(200).json({ msg: "updated succfully", updatedUser });
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' });
        res.status(200).json(employees);
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
};

