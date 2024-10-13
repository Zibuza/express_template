
import mongoose from "mongoose";

const { Schema } = mongoose;

// Match Schema
const matchSchema = new mongoose.Schema({
    teams: [
        mongoose.Schema.Types.ObjectId,
    ],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'finished'],
        required: true,
    },
    winner_players: [
        mongoose.Schema.Types.ObjectId,,
    ],
    stats: [
       { 
        player_id: mongoose.Schema.Types.ObjectId,
        Stats: Object
        }
    ]

}, { versionKey: false });




const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default {

    Match
};
