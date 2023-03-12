const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    category: {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
    },

    capcacity: {
        type: Number,
        default: 20
    },

    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],

    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }
}, {timestamps: false, versionKey: false});

module.exports = mongoose.model("Group", GroupSchema);