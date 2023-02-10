const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const addTask = async (req, res) => {
  token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const { name } = req.body;
  const task = await Task.create({ name, createdBy: payload.id });
  res.json({ task });
};

const getTasks = async (req, res) => {
  token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const tasks = await Task.find({ createdBy: payload.id });
  res.json({ tasks, count: tasks.length });
};

const getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const task = await Task.findOne({ _id: taskId, createdBy: payload.id });
  res.json({ task });
};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  await Task.findOneAndDelete({
    _id: taskId,
    createdBy: payload.id,
  });
  res.json({ msg: "Done" });
};

const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  await Task.findOneAndUpdate(
    { _id: taskId, createdBy: payload.id },
    { name: req.body.name }
  );
  res.json({ msg: "khalas ya kosomk" });
};

module.exports = { addTask, getTasks, getTaskById, deleteTask, updateTask };
