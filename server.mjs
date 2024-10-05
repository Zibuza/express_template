// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { default as User } from "./Api/models/UserModel.mjs";

import { routes } from "./Api/routes/routes.mjs";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {serverSelectionTimeoutMS: 3000})

const app = express();

const PORT = process.env.PORT || 3000;

// use modules
app.use(cors());
app.use(express.json());

const userModel = User;

routes(app, {
    User: userModel
});

app.listen(PORT, () => {
    console.log(`server http://localhost:${PORT}`);
});
