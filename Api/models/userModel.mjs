import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["moder", "admin"],
        default: "moder"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });


const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
