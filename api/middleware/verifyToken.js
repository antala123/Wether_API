import Jwt from "jsonwebtoken";
import User from "../model/User.js";

export const verifyauthToken = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        // Validation:
        if (!accessToken) {
            return next('Unauthorized User...');
        }

        const tokendecode = Jwt.verify(accessToken, process.env.JWT_KEY);

        req.user = await User.findById(tokendecode._id);

        next();
    }
    catch (err) {
        return next('Unauthorized User...');
    }
}