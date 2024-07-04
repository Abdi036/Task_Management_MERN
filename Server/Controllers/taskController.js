const Task = require("../Models/TaskModel");

// Get All tasks
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: "success",
      result: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get task by ID
const getTask = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Create a task
const createTask = async (req, res, next) => {
  try {
    const { name, description, dueDate, status } = req.body;
    const newTask = await Task.create({ name, description, dueDate, status });
    res.status(201).json({
      status: "success",
      newTask,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update Task
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, dueDate, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, description, dueDate, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete task
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
