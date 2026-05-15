const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected to mongodb successfully");
  })
  .catch((err) => {
    console.log("mongodb connection error:", err);
  });

// routes
const eventRoutes = require("./routes/events");
app.use("/api/events", eventRoutes);


app.get("/", (req, res) => {
  res.send("Meetup App Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});