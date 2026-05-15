const express = require("express");
const router = express.Router();
const Event = require("../models/Event");


router.get("/", async (req, res) => {
  try {
    let query = {};

   
    if (req.query.type && req.query.type !== "Both") {
      query.type = req.query.type;
    }

    
    if (req.query.search) {
      let searchText = req.query.search;
      query.$or = [
        { title: { $regex: searchText, $options: "i" } }, 
        { tags: { $regex: searchText, $options: "i" } },
      ];
    }

    const events = await Event.find(query);
    res.json(events);
  } catch (err) {
    console.log("error getting events:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.log("error getting event:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.log("error creating event:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.log("error deleting event:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;