const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
  },
  phone: {
    type: String,
  },

  password: {
    type: String,
  },

  city: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
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
    default: "teacher",
  },

  connectCubeId: {
    type: String,
    default: null,
  },

  assigned: [
    {
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes",
      },
      subject: {
        type: [String], // Assuming each tag is a string
        default: [],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

teacherSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const TEACHER = mongoose.model("teachers", teacherSchema);
module.exports = TEACHER;
