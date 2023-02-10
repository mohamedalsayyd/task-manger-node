const express = require("express");
const {
  addTask,
  getTasks,
  getTaskById,
  deleteTask,
  updateTask,
} = require("../controllers/tasks");
const router = express.Router();

router.post("/addTask", addTask);
router.get("/getTasks", getTasks);
router.get("/getTaskById/:taskId", getTaskById);
router.delete("/deleteTask/:taskId", deleteTask);
router.patch("/updateTask/:taskId", updateTask);

module.exports = router;
