const express = require("express");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../Controllers/taskController");

const router = express.Router();

router.get("/tasks", getAllTasks);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
