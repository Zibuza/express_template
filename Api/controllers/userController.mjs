import mongoose from "mongoose"
import bcrypt from "bcrypt"

const User = mongoose.model("User")

async function register(req, res) {
    try {
        // Destructure the required fields from request body
        const { name, email, password, role, discord_nickname, steam_id } = req.body;

        // Check if the required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please provide all required fields" });
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(403).json({ msg: "User already registered" });
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPass,
            role,
            steam_id,
            discord_nickname: discord_nickname || null, // Optional field
            rank: rank || null, // Optional field
        });

        // Save the user to the database
        await newUser.save();

        // Return success response
        res.status(201).json({ msg: "User Registered Successfully" });
    } catch (err) {
        console.error("Error while adding user", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export default{
    register
}