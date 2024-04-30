const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ["parent", "admin", "teacher", "student"],
    default: "student",
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
  },

  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parents",
  },
  email: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

studentSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const STUDENT = mongoose.model("students", studentSchema);
module.exports = STUDENT;
