import mongoose from "mongoose";
const Event = mongoose.model("Event");

async function create_event(req, res) {
    try {
        
        let { name, desc, start_date, end_date, games, teams, reg_fee, payment_history, sponsors, badges } = req.body;

        
        if (!name || !start_date || !games) {
            return res.status(400).json({ msg: 'Name, start date, and games are required' });
        }

        
        payment_history = payment_history || []; 
        sponsors = sponsors || []; 
        badges = badges || []; 

        
        const newEvent = new Event({
            name,
            desc,
            start_date,
            end_date,
            games,
            teams,
            reg_fee,
            payment_history,
            sponsors,
            badges
        });

        
        await newEvent.save();

        
        res.status(201).json({ msg: "Event created successfully", event: newEvent });
    } catch (err) {
        console.error("Error while creating event:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export default {
    create_event
};
