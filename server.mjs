// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { default as User } from "./Api/models/userModel.mjs";
import { default as Match } from "./Api/models/matchModel.mjs";
import { default as Team } from "./Api/models/teamModel.mjs";
import { default as Event } from "./Api/models/eventModel.mjs";
import { default as Game } from "./Api/models/gameModel.mjs";

import { routes } from "./Api/routes/routes.mjs";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {serverSelectionTimeoutMS: 3000})

const app = express();

const PORT = process.env.PORT || 3000;

// use modules
app.use(cors());
app.use(express.json());



routes(app, {
 User,
 Team,
 Match,
 Event,
 Game
});

app.listen(PORT, () => {
    console.log(`server http://localhost:${PORT}`);
});
