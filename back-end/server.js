const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());


const eventRoutes = require("./routes/events");
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Meetup App Backend is running!");
});


mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected to mongodb successfully");
  })
  .catch((err) => {
    console.log("mongodb connection error:", err);
  });

module.exports = app;