import User from "../model/User.js";
import bcrypt from 'bcrypt';



export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate:
        if (!name || !email || !password) {
            return next('Please fill all the fields...');
        }

        // Validate Email:
        const emailcheck = await User.findOne({ email });
        if (emailcheck) {
            return next('Email Already Registered, Please Login...');
        }

        // Hash Password:
        const Hashpassword = await bcrypt.hash(password, 10);


        const userData = await User.create({
            name,
            email,
            password: Hashpassword,
        })

        res.status(201).json({
            message: 'User Registered Successfully, Please Login...', userData
        })
    }
    catch (error) {
        return next(error.message || 'Error In Register API...');
    }
}


export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate:
        if (!email || !password) {
            return next('Please fill User Email and Password...');
        }

        // Validate Email:
        const emailcheck = await User.findOne({ email });
        if (!emailcheck) {
            return next('Invalid User Email...');
        }

        // Check Password:
        const isMatch = await bcrypt.compare(password, emailcheck.password);
        if (!isMatch) {
            return next('Invalid User Password...');
        }

        // Generate Token:
        const Accesstoken = emailcheck.createJWT();

        res.cookie("accessToken", Accesstoken, { httpOnly: false })
            .status(200)
            .json({ message: 'User Login Successfully...', Accesstoken: Accesstoken, emailcheck });
    }
    catch (error) {
        return next('User Data Not Found...');
    }
}

