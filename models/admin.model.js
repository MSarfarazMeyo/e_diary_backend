const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "admin",
  },
  password: {
    type: String,
    required: true,
  },

  connectCubeId: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["parent", "admin", "teacher", "student"],
    default: "admin",
  },
  profilePic: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

adminSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
