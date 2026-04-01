const Department = require('../models/Departments');
const User = require('../models/User');

exports.createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        const newDept = new Department({ name });
        await newDept.save();
        res.status(201).json({ msg: "Department created successfully", newDept });

    // check if this dept exist:
    const existDept = await Department.findOne({name})
    if(existDept) return res.status(400).json({msg:"the department already exist"})
    } 


    catch (err) {
        res.status(500).json({ error: err.message });
    }

};

// delete dept - still work on it - e3ml el rout
exports.deleteDepartment = async (req, res) => {
    try {
        const { name } = req.params; 
        
        const deleteDepartment = await User.findByIdAndDelete(name);
        
        if (!deleteDepartment) return res.status(404).json({ msg: "this dept is not exist" });

        res.status(200).json({ msg: "deleted succufully", deleteDepartment });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read - get
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('manager', 'name email');  //pop => id for mgr
            res.status(200).json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};