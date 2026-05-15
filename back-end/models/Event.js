const mongoose = require("mongoose");

// this is the schema for an event
// i am defining what fields each event should have

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  venue: {
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
  },
  speakers: [
    {
      name: { type: String },
      topic: { type: String },
    },
  ],
  sessions: [
    {
      title: { type: String },
      startTime: { type: String },
      endTime: { type: String },
    },
  ],
  tags: [String],
  isPaid: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  dressCode: {
    type: String,
    default: "",
  },
  ageRestriction: {
    type: String,
    default: "No restriction",
  },
  additionalInfo: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;