// const jwt = require('jsonwebtoken');

// exports.isAuth = (req, res, next) => {
//     if (req.user) {
//         next(); 
//     } else {
//         res.status(401).json({ message: "please sign in first" });
//     }
// };

// module.exports = (req, res, next) => {
//     try {

//         if (!req.headers.authorization) {
//             return res.status(401).json({ msg: "No token, authorization denied" });
//         }

//         const token = req.headers.authorization.split(" ")[1];
//         console.log("Token received:", token); 
        
//         const decoded = jwt.verify(token, 'secret_key');      

//         console.log("token is :", decoded); 
//         if (decoded.role !== 'hr') {
//             return res.status(403).json({ msg: "You are not HR to add employees" });
//         }

//         req.user = decoded;
//         next(); //
//     } catch (err) {

//         res.status(401).json({ msg: "Token is not valid", error: err.message });
//     }
// }



const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ msg: "No token, denied" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid Token" });
    }
};

exports.isHR = (req, res, next) => {
    if (req.user && req.user.role === 'hr') {
        next();
    } else {
        res.status(403).json({ msg: "Access denied. HR only!" });
    }
};