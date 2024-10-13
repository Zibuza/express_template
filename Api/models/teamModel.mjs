

import mongoose from "mongoose";

const { Schema } = mongoose;

// Teams Schema
const teamSchema = new mongoose.Schema({
    name: String,
    players: [
        mongoose.Schema.Types.ObjectId,
    ],
    player_count: Number,

}, { versionKey: false });



const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);


export default {

    Team
};
