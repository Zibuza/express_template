import mongoose from "mongoose"
import axios from "axios"
import fs from "fs"

const Game = mongoose.model("Game")

async function fetch_games(req, res) {
    try {
        const response = await axios.get("https://steamspy.com/api.php?request=all");
        const games = response.data;

        let gameList = Object.values(games).map(game => ({
            appid: game.appid,
            name: game.name
        }));

        // Check if gameList is empty
        if (gameList.length === 0) {
            fs.readFile("games.json", "utf-8", (err, data) => {
                if (err) {
                    console.error("Error reading game IDs file:", err);
                    return res.status(500).json({ msg: "Error reading game IDs file" });
                }
                try {
                    gameList = JSON.parse(data);
                    return res.json(gameList); // Respond with loaded game list
                } catch (parseError) {
                    console.error("Error parsing JSON:", parseError);
                    return res.status(500).json({ msg: "Error parsing JSON" });
                }
            });
        } else {
            return res.json(gameList); // Respond with fetched game list
        }
    } catch (err) {
        console.error("Error while fetching games:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


async function fetch_game(req, res) {
    try {
        const { steam_id, steam_ids } = req.body;

        // If no steam_id or steam_ids are provided, return an error message
        if (!steam_id && !steam_ids) {
            return res.status(400).json({ msg: "No steam_id or steam_ids provided" });
        }
        
        let existingGame = await Game.findOne({steam_id})
        if (existingGame){
            return res.json({ msg: "games data", existingGame });
        }

        // Function to extract game info from the response
        const extractGameInfo = (game, id) => {
            const data = game.data;
            return {
                appid: data.appid,
                name: data.name,
                cats: data.categories,
                banner: data.header_image,
                steam_id: id
            };
        };
        
       
        // If steam_ids are provided, fetch data for multiple games in parallel
        if (steam_ids != undefined) {
            const gamesInfo = await Promise.all(
                steam_ids.map(async (id) => {
                    const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`);
                    let game = response.data[id];

                    return extractGameInfo(game, id);
                })
            );
            return res.json({ msg: "games data", gamesInfo });
        }

        // If only a single steam_id is provided, fetch data for that game
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${steam_id}`);
        const game = response.data[steam_id];
        let gameInfo = extractGameInfo(game, steam_id);


        const newGame = new Game(gameInfo)
        await newGame.save()

        return res.json({ msg: "games data", gameInfo });

    } catch (err) {
        console.error("Error while fetching game:", err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export default {
    fetch_games,
    fetch_game
}