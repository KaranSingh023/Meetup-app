
const dns = require("dns");                        
dns.setServers(["8.8.8.8", "8.8.4.4"]);          
require("dotenv").config();                        
const mongoose = require("mongoose");               
const Event = require("./models/Event");           

const sampleEvents = [
  {
    title: "React JS for Beginners",
    description:
      "Learn React JS from scratch. We will cover components, props, state, and hooks. Perfect for beginners who want to start their frontend journey. You will build a small project by the end of the session.",
    type: "Online",
    date: "2025-08-15",
    time: "6:00 PM",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
    venue: {
      name: "Zoom Meeting",
      address: "Online",
      city: "Online",
    },
    speakers: [
      { name: "Rahul Sharma", topic: "React Basics and Components" },
      { name: "Priya Singh", topic: "Hooks and State Management" },
    ],
    sessions: [
      { title: "Introduction to React", startTime: "6:00 PM", endTime: "7:00 PM" },
      { title: "Building Components", startTime: "7:00 PM", endTime: "8:00 PM" },
      { title: "Q&A Session", startTime: "8:00 PM", endTime: "8:30 PM" },
    ],
    tags: ["react", "javascript", "frontend", "beginners"],
    isPaid: false,
    price: 0,
    dressCode: "No dress code",
    ageRestriction: "18+",
    additionalInfo: "Please install Node.js before the session. Link will be sent via email.",
  },
  {
    title: "Node.js and MongoDB Workshop",
    description:
      "A hands-on workshop where you will learn how to build a REST API using Node.js and MongoDB. We will go step by step and build a small backend project together. Great for people who know some JavaScript.",
    type: "Offline",
    date: "2025-08-20",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    venue: {
      name: "Tech Hub",
      address: "Sector 17, Plaza Building, 3rd Floor",
      city: "Chandigarh",
    },
    speakers: [
      { name: "Amit Verma", topic: "Node.js Fundamentals" },
      { name: "Sneha Kapoor", topic: "MongoDB and Mongoose" },
    ],
    sessions: [
      { title: "Node.js Setup and Basics", startTime: "10:00 AM", endTime: "11:30 AM" },
      { title: "Building REST APIs", startTime: "11:30 AM", endTime: "1:00 PM" },
      { title: "Lunch Break", startTime: "1:00 PM", endTime: "2:00 PM" },
      { title: "MongoDB Integration", startTime: "2:00 PM", endTime: "4:00 PM" },
    ],
    tags: ["nodejs", "mongodb", "backend", "api", "javascript"],
    isPaid: true,
    price: 499,
    dressCode: "Smart Casual",
    ageRestriction: "No restriction",
    additionalInfo: "Bring your own laptop. Lunch will be provided.",
  },
  {
    title: "UI/UX Design Meetup",
    description:
      "Monthly meetup for designers and developers interested in UI/UX. We will discuss the latest design trends, share portfolio reviews, and network with other designers. Whether you are a beginner or experienced, you are welcome!",
    type: "Offline",
    date: "2025-08-25",
    time: "5:00 PM",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
    venue: {
      name: "Design Studio Cafe",
      address: "MG Road, Near Central Mall",
      city: "Ludhiana",
    },
    speakers: [
      { name: "Kiran Bhatia", topic: "Design Trends 2025" },
    ],
    sessions: [
      { title: "Welcome and Networking", startTime: "5:00 PM", endTime: "5:30 PM" },
      { title: "Design Talk: Trends 2025", startTime: "5:30 PM", endTime: "6:30 PM" },
      { title: "Portfolio Review", startTime: "6:30 PM", endTime: "7:30 PM" },
    ],
    tags: ["design", "ui", "ux", "figma", "networking"],
    isPaid: false,
    price: 0,
    dressCode: "Casual",
    ageRestriction: "No restriction",
    additionalInfo: "Feel free to bring your portfolio on your laptop or printed.",
  },
  {
    title: "Python Data Science Bootcamp",
    description:
      "A full day bootcamp covering Python basics, Pandas, Numpy, and an intro to Machine Learning. You will work with real datasets and get hands-on practice. Certificate will be provided at the end.",
    type: "Online",
    date: "2025-09-01",
    time: "9:00 AM",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    venue: {
      name: "Google Meet",
      address: "Online",
      city: "Online",
    },
    speakers: [
      { name: "Dr. Manish Gupta", topic: "Python and Pandas" },
      { name: "Aisha Khan", topic: "Machine Learning Basics" },
    ],
    sessions: [
      { title: "Python Basics Recap", startTime: "9:00 AM", endTime: "10:30 AM" },
      { title: "Working with Pandas", startTime: "10:30 AM", endTime: "12:00 PM" },
      { title: "Break", startTime: "12:00 PM", endTime: "12:30 PM" },
      { title: "Intro to Machine Learning", startTime: "12:30 PM", endTime: "2:30 PM" },
    ],
    tags: ["python", "data science", "machine learning", "pandas"],
    isPaid: true,
    price: 999,
    dressCode: "No dress code",
    ageRestriction: "16+",
    additionalInfo: "Python 3.9+ should be installed. Google Colab can also be used.",
  },
  {
    title: "Startup Networking Night",
    description:
      "A fun evening event for startup founders, developers, and investors to meet and connect. Pitch your idea in 2 minutes if you want, or just come to network. Light refreshments will be available.",
    type: "Offline",
    date: "2025-09-05",
    time: "7:00 PM",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600",
    venue: {
      name: "The Loft",
      address: "BKC, Near MMRDA Ground",
      city: "Mumbai",
    },
    speakers: [],
    sessions: [
      { title: "Networking & Welcome Drinks", startTime: "7:00 PM", endTime: "8:00 PM" },
      { title: "2-Minute Pitches", startTime: "8:00 PM", endTime: "9:00 PM" },
      { title: "Open Networking", startTime: "9:00 PM", endTime: "10:00 PM" },
    ],
    tags: ["startup", "networking", "entrepreneurship", "funding"],
    isPaid: true,
    price: 299,
    dressCode: "Business Casual",
    ageRestriction: "21+",
    additionalInfo: "RSVP is mandatory. Limited spots available.",
  },
  {
    title: "Git and GitHub for Absolute Beginners",
    description:
      "Never used Git before? No problem! This online session will take you from zero to comfortable with version control. You will learn how to create repos, commit code, and collaborate with others on GitHub.",
    type: "Online",
    date: "2025-09-10",
    time: "7:00 PM",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600",
    venue: {
      name: "Microsoft Teams",
      address: "Online",
      city: "Online",
    },
    speakers: [
      { name: "Rohit Mehra", topic: "Git Basics and GitHub Workflow" },
    ],
    sessions: [
      { title: "What is Version Control?", startTime: "7:00 PM", endTime: "7:30 PM" },
      { title: "Git Commands Hands-on", startTime: "7:30 PM", endTime: "8:30 PM" },
      { title: "GitHub Collaboration", startTime: "8:30 PM", endTime: "9:00 PM" },
    ],
    tags: ["git", "github", "version control", "beginners", "coding"],
    isPaid: false,
    price: 0,
    dressCode: "No dress code",
    ageRestriction: "No restriction",
    additionalInfo: "Git should be installed before the session. Install guide will be shared.",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to mongodb");

    // clear existing events
    await Event.deleteMany({});
    console.log("old events deleted");

    // add sample events
    await Event.insertMany(sampleEvents);
    console.log("sample events added successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.log("error seeding database:", err);
  }
}

seedDatabase();