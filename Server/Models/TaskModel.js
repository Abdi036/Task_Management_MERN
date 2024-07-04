const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "task must have a name."],
    },
    description: {
      type: String,
      required: [true, "task must have a description."],
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,

      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
