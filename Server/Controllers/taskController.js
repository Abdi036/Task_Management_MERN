const Task = require("../Models/TaskModel");
const catchAsync = require("../utils/catchAsync");

// Get All tasks
const getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    result: tasks.length,
    data: {
      tasks,
    },
  });
});

// Get task by ID
const getTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "Task not found",
    });
  }

  res.status(200).json({
    status: "success",
    task,
  });
});

// create a task

const createTask = catchAsync(async (req, res) => {
  const { name, description, dueDate, status } = req.body;
  const newTask = await Task.create({ name, description, dueDate, status });
  res.status(201).json({
    status: "success",
    savedTask,
  });
});

// update Task

const updateTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, description, dueDate, status } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { name, description, dueDate, status },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    updatedTask,
  });
});

// delete task

const deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "task Deleted Successfully",
  });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
