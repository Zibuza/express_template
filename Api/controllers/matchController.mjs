import mongoose from "mongoose"
import axios from "axios"


const Match = mongoose.model("Match")
const User = mongoose.model("User")
const Game = mongoose.model("User")



async function create_match(req, res) {
    try {



        const match = new Match({
            teams: [],
            status: `upcoming`,
            stats: []
        });

        await match.save();

        res.status(201).json({ msg: "match created successfully", match });


    } catch (err) {
        console.error("Error while creating match:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

async function fetch_stats(API_KEY,game_id,user_id){
    const response = await axios.get('https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/', {
        params: {
            appid: game_id,
            key: API_KEY,
            steamid: user_id
        }
    });

    return response.data
}

// ივენთიდან უნდა ვიპოვო მატჩები და შემდგომ მოვითხოვო იმ მატჩის სტატუსი, სტატისტიკა
async function match_status(req, res) {
    try {

        let { id, game } = req.body;

        if (!id) {
            return res.status(404).json({ msg: 'id not found' });
        }
        let match = await Match.findById(id);

        let changed = match

        for (var stat of changed.stats){
            var player =  await User.findById(stat.player_id);
            var curent_game = await Game.findById(game)
            // games.renode.space
            // let stats = await fetch_stats("4046F5B8A44A6BF343AEB494AFE62806", game.steam_id, player.player_steam_id)
            let stats = await fetch_stats("4046F5B8A44A6BF343AEB494AFE62806", curent_game.steam_id, 76561198315239006 )
            console.log(stats)
        }

        changed.stats = [
            {
            team: mongoose.Schema.Types.ObjectId,
            Stats: Object
            }
        ]

        Object.assign(match, changed);

        await match.save();

        res.status(200).json({
            msg: "match info", info: {
                status: match.status,
                stats: match.stats
            }
        });


    } catch (err) {
        console.error("Error while getting match info:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

// როცა მოთამააშეები შეივსება მატჩი ისტარტება 

async function match_start(req, res) {
    try {
        let { id } = req.body;

        if (!id) {
            return res.status(404).json({ msg: 'id not found' });
        }
        let match = await Match.findById(id);

        let changed = match

        changed.status = "ongoing"


        Object.assign(match, changed);

        await match.save();

        res.status(200).json({ msg: "match started successfully", changed });

    } catch (err) {
        console.error("Error while starting match:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

async function check_add_teams(req, res) {


}

async function match_stop(req, res) {
    /*
    status: finished
    winner_players: [
    ],
    stats: [

    ]*/
}

export default {
    create_match,
    match_status,
    match_start
};


