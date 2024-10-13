import mongoose from "mongoose";

const { Schema } = mongoose;

// User Schema
const userSchema = new mongoose.Schema({

    name: String,
    role: String,
    password: String,
    discord_nickname: String,
    player_steam_id: Number,
    rank: String,
    money_spent: Number,

    email: {
        type: String,
        required: true,
        unique: true
    },

    games: [
        {
            steam_id: Number,
            Info: Object
        }
    ],
    events: [
        mongoose.Schema.Types.ObjectId,
    ]


}, { versionKey: false });



const User = mongoose.models.User || mongoose.model("User", userSchema);

export default {

    User
};
