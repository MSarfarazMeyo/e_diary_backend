const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  timeTable: {
    type: [
      {
        _id: false,
        day: {
          type: String,
          required: true,
        },
        periods: {
          type: [String],
          default: [null, null, null, null, null, null, null], // Default array with 6 null elements
        },
      },
    ],
    default: [
      { day: "Monday", periods: [null, null, null, null, null, null, null] },
      { day: "Tuesday", periods: [null, null, null, null, null, null, null] },
      { day: "Wednesday", periods: [null, null, null, null, null, null, null] },
      { day: "Thursday", periods: [null, null, null, null, null, null, null] },
      { day: "Friday", periods: [null, null, null, null, null, null, null] },
      { day: "Saturday", periods: [null, null, null, null, null, null, null] },
    ],
  },
  subject: {
    type: [{}],
  },

  attendance: {
    type: [{}],
  },

  incharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teachers",
  },
});

classesSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const CLASSES = mongoose.model("classes", classesSchema);
module.exports = CLASSES;
