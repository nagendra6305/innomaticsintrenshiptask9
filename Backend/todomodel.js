


const mongoose = require("mongoose");

let tododata = new mongoose.Schema({
    Description: {
        type: String,
        required: true,
    },
    due_date: { type: Date },
    created_at: { type: Date, default: Date.now },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserData', 
        required: true 
    }
});

module.exports = mongoose.model("todoData", tododata);
