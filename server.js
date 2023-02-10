const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("."));

const path = require("path");

const jwt = require("jsonwebtoken");

const connectDB = require("./db/db");

const port = process.env.PORT || 8080;
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const userRouter = require("./Routes/usersRouter");
const tasksRouter = require("./Routes/tasksRouter");
app.use("/", userRouter);
app.use("/", tasksRouter);
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/tasks", (req, res) => {
  res.render("tasks.ejs");
});

app.get("/updateTask", (req, res) => {
  res.render("updateTask.ejs");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, (req, res) => {
      console.log(`server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
