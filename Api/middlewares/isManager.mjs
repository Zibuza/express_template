import mongoose from "mongoose";
import bcrypt from "bcrypt";

const User = mongoose.model("User");

export async function managerCheck(req, res, next) {
  try {
    let { email, password } = req.body.manager || {};

    if (!email || !password) {
      return res.status(400).json({ msg: "manager Email and password are required" });
    }

    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(404).json({ msg: "manager User not found" });
    }

    // Check if the user has the 'manager' role and if the password matches
    const passwordMatches = await bcrypt.compare(password, user.password);


    if ( !(user.role == "manager" || user.role == "admin") || !passwordMatches) {
        return res.status(403).json({ msg: "Unauthorized access" });
    }
    

    next();

  } catch (err) {
    console.error("Error during manager check:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export default managerCheck;
