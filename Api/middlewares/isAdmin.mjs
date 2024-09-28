import mongoose from "mongoose"
import bcrypt from "bcrypt"

const User = mongoose.model("Users")
export async function adminCheck(req, res, next) {
    try {
        const { email, password } = req.body;

       
        const user = await User.findOne({ email:email });

        if (user.role !== 'admin' || !bcrypt.compare(user.password, password) ){
            return res.status(401).json({ msg: "Unauthorized" });
        }
        next();
    } catch (err) {
        console.error("Error during admin check:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export default adminCheck;
