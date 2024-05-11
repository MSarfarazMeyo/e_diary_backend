const mongoose = require("mongoose");

const edairySchema = new mongoose.Schema({
  subject: {
    type: String,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
  },
  comments: {
    type: [
      {
        comment: { type: String },
        date: { type: String },
        role: { type: String },
        name: { type: String },
        userId: { type: String },
        profilePic: { type: String },
        reply: {
          comment: { type: String },
          date: { type: String },
          role: { type: String },
          name: { type: String },
          userId: { type: String },
          profilePic: { type: String },
        },
      },
    ],
    default: [],
  },
  content: {
    type: [String], // Assuming each tag is a string
    default: [],
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

edairySchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const E_DAIRY = mongoose.model("e_dairies", edairySchema);
module.exports = E_DAIRY;
