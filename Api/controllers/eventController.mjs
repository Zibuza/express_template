import mongoose from "mongoose"


const Event = mongoose.model("Event")


async function create_event(req, res) {
    try {


    } catch (err) {
        console.error("Error while creating event:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


export default {
   create_event
}