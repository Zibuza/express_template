import mongoose from "mongoose"
import bcrypt from "bcrypt"


const User = mongoose.model("User")

async function register_staff(req, res) {
    try {
        // Destructure the required fields from request body
        const { name, email, password, role, discord_nickname, steam_id, rank } = req.body;

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
            role: role || "user",
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


async function register(req, res) {
    try {
        // Destructure the required fields from request body
        const { name, email, password, discord_nickname, steam_id, rank } = req.body;

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
            role:  "user",
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


async function change_role(req, res) {
    try {
        let { email, role } = req.body;

        // Ensure email and role are provided
        if (!email || !role) {
            return res.status(400).json({ msg: 'Email and role are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the user's role is already the target role
        if (user.role === role) {
            return res.status(400).json({ msg: `User is already a ${role}` });
        }

        // Update user role
        user.role = role;

        // If the new role is "manager", initialize specific fields
        if (role === "manager") {
            user.events = [];
            user.money_spent = 0;
            user.sponsors = [];
        }else if(role == "user"){
            user.events = null;
            user.money_spent = null;
            user.sponsors = null;
        }


        // Save the updated user 
        await user.save()
        res.json({ msg: "Role updated successfully", user });
    } catch (err) {
        console.error("Error while changing role:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}



export default{
    register,
    register_staff,
    change_role
}
