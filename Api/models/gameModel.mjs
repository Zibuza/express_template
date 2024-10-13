import mongoose from "mongoose";

const { Schema } = mongoose;

// Game Schema
const gameSchema = new mongoose.Schema({
    name:String,
    category:String,
    banner:String,


}, { versionKey: false });

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default {


    Game
};
