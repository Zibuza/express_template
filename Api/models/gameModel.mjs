import mongoose from "mongoose";

const { Schema } = mongoose;

// Game Schema
const gameSchema = new mongoose.Schema({
    name:String,
    cats:Array,
    banner:String,
    steam_id: Number


}, { versionKey: false });

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default {


    Game
};
