import mongoose from "mongoose"
import bcrypt from "bcrypt"
import axios from "axios"
import fs from "fs"

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


async function fetch_games(req, res) {
  try {
    const response = await axios.get("https://steamspy.com/api.php?request=all");
    const games = response.data;

    let gameList = Object.values(games).map(game => ({
      appid: game.appid,
      name: game.name
    }));

    // Check if gameList is empty
    if (gameList.length === 0) {
      fs.readFile("games.json", "utf-8", (err, data) => {
        if (err) {
          console.error("Error reading game IDs file:", err);
          return res.status(500).json({ msg: "Error reading game IDs file" });
        }
        try {
          gameList = JSON.parse(data);
          return res.json(gameList); // Respond with loaded game list
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          return res.status(500).json({ msg: "Error parsing JSON" });
        }
      });
    } else {
      return res.json(gameList); // Respond with fetched game list
    }
  } catch (err) {
    console.error("Error while fetching games:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}


async function fetch_game(req, res) {
    try {
        const { steam_id, steam_ids } = req.body;

        // If no steam_id or steam_ids are provided, return an error message
        if (!steam_id && !steam_ids) {
            return res.status(400).json({ msg: "No steam_id or steam_ids provided" });
        }

        // Function to extract game info from the response
        const extractGameInfo = (game) => {
            const data = game.data;
            return {
                appid: data.appid,
                name: data.name,
                cats: data.categories,
                banner: data.header_image
            };
        };
        
        // If steam_ids are provided, fetch data for multiple games in parallel
        if (steam_ids.length > 0) {
            const gamesInfo = await Promise.all(
                steam_ids.map(async (id) => {
                    const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`);
                    const game = response.data[id];
                    return extractGameInfo(game);
                })
            );
            return res.json({ msg: "games data", gamesInfo });
        }

        // If only a single steam_id is provided, fetch data for that game
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${steam_id}`);
        const game = response.data[steam_id];
        const gameInfo = extractGameInfo(game);
        return res.json({ msg: "games data", gameInfo });

    } catch (err) {
        console.error("Error while fetching games:", err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export default{
    register,
    register_staff,
    change_role,
    fetch_games,
    fetch_game
}