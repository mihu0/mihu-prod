//This for the protection of routes this checks if the route is accessed by authenticated user or not
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import {JWT_SECRET} from "../config/config.js"

export async function protect(req, res, next) {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success:false,
            error: "Not authorized to access this route"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success:false,
                error: "No user found with this id"
            });
        }else{

            req.user = user;
        }


        next();
    } catch (err) {
        return res.status(401).json({
            success:false,
            error: "Not authorized to access this router"
        });
    }
}
