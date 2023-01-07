require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/todo";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to Database");
    app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));
  })
  .catch((err) => console.log(err));


  app.get("/", (req, res) => {
    res.status(200).json({
      status: "SUCCESS",
      message: "OK one",
    });
  });
  

// app.get("/", (req, res) => {
//   res.send("hello World");
// });

app.post("/register", async (req, res) => {
  try {
    let users = await user.find({ username: req.body.username });
    if (users[0]) {
      res.send({
        message: "User Already Exist",
      });
    } else {
      await user.create(req.body);
      res.send({
        message: "User Created",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    let users = await user.find({ username: req.body.username });
    if (users[0]) {
      if (users[0]["password"] === req.body.password) {
        res.send(users[0]);
      } else {
        res.send({
          message: "Invalid Password",
        });
      }
    } else {
      res.send({
        message: "Invalid User or User NOT REGISTERED",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/update", async (req, res) => {
  try {
    let users = await user.find({ username: req.body.username });
    await user.updateOne(
      { username: req.body.username },
      { ...users, data: req.body.data }
    );
    res.send({ message: "updated successfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

