import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async(req, res, next) => {
    try{
        const auth = req.headers.authorization;
        if(!auth || !auth.toLowerCase().startsWith("bearer ")){
            return res.status(401).json({message: "Bearer token not found"});
        }
        const token = auth.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(payload.id).select("-password");

        if (!req.user) {
            return res.status(401).json({message: "User for token not found"});
        }

        next();
    }catch(err){
        return res.status(401).json({message: "Invalid or expired token"});
    }
}

export default protect

