import mongoose from "mongoose";

const { Schema } = mongoose;
// Event Schema
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    badge: {
        type: String,
    },
    sponsor: {
        type: String,
    },
}, { timestamps: true });

// Game Schema
const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
}, { timestamps: true });

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    badges: [{
        type: String,
        default: [],
    }],
    discord: {
        type: String,
    },
    server: {
        type: String,
    },
}, { timestamps: true });

// Manager Schema
const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    assigned_events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    assigned_teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    sponsors: [{
        type: String,
    }],
}, { timestamps: true });

// Admin Schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    managed_events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    managed_teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    sponsors: [{
        type: String,
    }],
}, { timestamps: true });

// Teams Schema
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    player_count: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

// Match Schema
const matchSchema = new mongoose.Schema({
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'finished'],
        required: true,
    },
    result: {
        type: String,
    },
}, { timestamps: true });

// Exporting all schemas using mongoose.models

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Manager = mongoose.models.Manager || mongoose.model("Manager", managerSchema);
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default {
    
    Event,
    Game,
    User,
    Manager,
    Admin,
    Team,
    Match
};
