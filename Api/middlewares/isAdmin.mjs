import mongoose from "mongoose"
import bcrypt from "bcrypt"

const User = mongoose.model("User")
export async function adminCheck(req, res, next) {
    try {
        try{
            let { email, password } = req.body.admin;
            const user = await User.findOne({ email:email });

            if (user.role !== 'admin' || !bcrypt.compare(user.password, password) ){
                req.body.role = null
            }

        }catch{
            let { email, password } = req.body;
            req.body.role = null
        }
        
        next();

    } catch (err) {
        console.error("Error during admin check:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export default adminCheck;
