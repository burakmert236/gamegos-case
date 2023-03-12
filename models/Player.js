const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  username: {
    type: String,
  },

  level: {
    type: Number,
    required: true,
    default: 1
  },

  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },

  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  }
}, {timestamps: false, versionKey: false});

module.exports = mongoose.model("Player", PlayerSchema);