const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  idCard: {
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
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["parent", "admin", "teacher", "student"],
    default: "parent",
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

parentSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const STUDENT = mongoose.model("parents", parentSchema);
module.exports = STUDENT;
