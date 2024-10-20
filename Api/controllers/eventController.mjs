import mongoose from "mongoose";
const Event = mongoose.model("Event");


async function create_event(req, res) {
    try {

        let { name, desc, start_date, end_date, reg_fee, game } = req.body;


        if (!name || !start_date || (desc && typeof desc !== 'string') || (end_date && new Date(end_date) < new Date(start_date)) || (reg_fee && isNaN(Number(reg_fee)))) {
            return res.status(400).json({ msg: 'Invalid input: ensure required fields are provided and data types are correct.' });
        }


        let payment_history = [];
        let sponsors = [];
        let badges = [];
        let teams = []
        let matches = []


        const newEvent = new Event({
            name, desc, start_date, end_date, matches, teams, reg_fee, sponsors, badges, payment_history, badges, sponsors, game
        });


        await newEvent.save();


        res.status(201).json({ msg: "Event created successfully", event: newEvent });
    } catch (err) {
        console.error("Error while creating event:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
async function change_event(req, res) {
    try {


        let { new_event } = req.body;


        // Find the event by ID
        let event = await Event.findById(new_event._id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }


        Object.assign(event, new_event);

        await event.save();

        res.status(200).json({ msg: "Event updated successfully", event });
    } catch (err) {
        console.error("Error while updating event:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


async function get_event(req, res) {
    try {


        let { _id } = req.body;


        // Find the event by ID
        let event = await Event.findById(_id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.status(200).json({ msg: "Event info", event });
    } catch (err) {
        console.error("Error while updating event:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
async function del_event(req, res) {
    try {
        // Extract _id from request body
        let { _id } = req.body;

        // Check if _id is provided
        if (!_id) {
            return res.status(400).json({ msg: 'Event _id is required' });
        }

        // Find and delete the event by ID
        let event = await Event.findByIdAndDelete(_id);

        // If event doesn't exist, return 404
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Successfully deleted
        res.status(200).json({ msg: "Event deleted successfully", event });
    } catch (err) {
        console.error("Error while deleting event:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

async function add_player(req, res) {
    // create teams

}


export default {
    create_event,
    change_event,
    get_event,
    del_event
};
