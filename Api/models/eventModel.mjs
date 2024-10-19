import mongoose from "mongoose";


const { Schema } = mongoose;

// Event Schema
const eventSchema = new mongoose.Schema({
    name: String,
    desc: String,
    start_date: {
        type: Date,
     
    },
    end_date: {
        type: Date,
    },
    
    matches: [
        mongoose.Schema.Types.ObjectId,
    ],
    teams:[
        mongoose.Schema.Types.ObjectId,
    ],
    reg_fee: Number,
    payment_history:[
        {
            ID: String,
            Noney: Number
        } 
    ],
    sponsors: [
        {
            Name: Number,
            Info: Object
        }
    ],
    badges: [
        {
            Name: String,
            Info: Object
        }
    ]
    
}, { versionKey: false });



const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default {

    Event

};
