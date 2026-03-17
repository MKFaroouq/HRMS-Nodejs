const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator=require("validator");

// register
exports.register = async (req,res) =>
{
    try
    {
        // getting(receive) from postman
        const {name , email , password , role}=req.body

        const userExist = await User.findOne({email});
        if(userExist)
        {
            return res.status(400).json({msg:"this user already exist"})
        }

        // will use joi latter:
        if (!name || !email || !password || !role) {
        return res.status(400).json({ msg: "Please enter all fields" });
}

        const hashedPassword = await bcrypt.hash(password, 10);
        // gathring info into user.js 
        const newUser=new User ({
            name,
            email,
            password:hashedPassword,
            role
        })
        
        await newUser.save() // sent it to db to save it
        res.status(201).json({msg:"employee has been craeted successfully"}) // sucssufully 

        
    }
    catch (err)
    {
        res.status(500).json({error: err.message});
    }

}
    // login

    exports.login = async (req, res) => {
        try {
            const { email, password } = req.body;

            // check if user already exist:
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // const isMatch = await bcrypt.compare(password, user.password);
            // if (!isMatch) {
            //     return res.status(400).json({ error: "Invalid credentials" });
            // }

            // create token
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET || 'fallback_secret',
                { expiresIn: '1d' }
            );

            res.status(200).json({
                msg: "Logged in successfully",
                token,
                role: user.role
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
};
   
