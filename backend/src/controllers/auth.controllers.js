import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generate.token.js";

const register = async (req, res, next) => {
    try{
        const{firstName, lastName, gender, email, phone, password} = req.body;

    const userExist = await User.findOne({email});
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({firstName, lastName, gender, phone, email, password: hashPassword})
    const userObj = user.toObject();
    delete userObj.password;
    
    return res.status(201).json({
        success: true,
        message: `${email} created successfully`,
        user: userObj,
        token: generateToken(user._id)
    });

    }catch(err){
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please, enter your email and password"})
        }
        const user = await User.findOne({ email })//.select("password");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({
            success: true,
            message: `${email} login successful`,
            user: userObj,
            token: generateToken(user._id)
        });
    } catch (err) {
        next(err);
    }
};

export {register, login}