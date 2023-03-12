const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
  },

  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }]
}, {timestamps: false, versionKey: false});

module.exports = mongoose.model("Event", EventSchema);