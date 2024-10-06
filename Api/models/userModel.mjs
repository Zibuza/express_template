import mongoose from "mongoose";

const { Schema } = mongoose;
// Event Schema
const eventSchema = new mongoose.Schema({
    name: String,
    desc: String,
    start_date: {
        type: Date,
     
    },
    end_date: {
        type: Date,
    },
    time: {
        type: String,
        required: true,
    },
    games: [
        mongoose.Schema.Types.ObjectId,
    ],
    teams:[
        mongoose.Schema.Types.ObjectId,
    ],
    reg_fee: Number,
    payment_history:[
        {
            ID: String,
            Noney: Number
        } 
    ],
    sponsors: [
        {
            Name: Number,
            Info: Object
        }
    ],
    badges: [
        {
            Name: String,
            Info: Object
        }
    ]
    
}, { versionKey: false });

// Game Schema
const gameSchema = new mongoose.Schema({
    name:String,
    category:String,
    banner:String,


}, { versionKey: false });

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



// Teams Schema
const teamSchema = new mongoose.Schema({
    name: String,
    players: [
        mongoose.Schema.Types.ObjectId,
    ],
    player_count: Number,

}, { versionKey: false });

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


const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default {

    Event,
    Game,
    User,
    Team,
    Match
};
