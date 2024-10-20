import mongoose from "mongoose"

const Team = mongoose.model("Team")

async function create_team(req, res) {
    try {

        let { name, player_count } = req.body;

        let players = [];

        const newteam = new Team({
            player_count,
            name,
            players
        });

        await newteam.save();

        res.status(201).json({ msg: "team created successfully", team: newteam });
    } catch (err) {
        console.error("Error while creating team:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

async function change_team(req, res) {
    try {


        let { new_team } = req.body;


        // Find the team by ID
        let team = await team.findById(new_team._id);

        if (!team) {
            return res.status(404).json({ msg: 'team not found' });
        }


        Object.assign(team, new_team);

        await team.save();

        res.status(200).json({ msg: "team updated successfully", team });
    } catch (err) {
        console.error("Error while updating team:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


async function get_team(req, res) {
    try {


        let { _id } = req.body;


        // Find the team by ID
        let team = await team.findById(_id);

        if (!team) {
            return res.status(404).json({ msg: 'team not found' });
        }

        res.status(200).json({ msg: "team info", team });
    } catch (err) {
        console.error("Error while updating team:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
async function del_team(req, res) {
    try {
        // Extract _id from request body
        let { _id } = req.body;

        // Check if _id is provided
        if (!_id) {
            return res.status(400).json({ msg: 'team _id is required' });
        }

        // Find and delete the team by ID
        let team = await team.findByIdAndDelete(_id);

        // If team doesn't exist, return 404
        if (!team) {
            return res.status(404).json({ msg: 'team not found' });
        }

        // Successfully deleted
        res.status(200).json({ msg: "team deleted successfully", team });
    } catch (err) {
        console.error("Error while deleting team:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


export default {
    create_team,
    change_team,
    get_team,
    del_team
};
