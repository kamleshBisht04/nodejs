const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection successful!");
  })
  .catch((err) => console.log("❌ DB error:", err.message));

// create schema
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difficulty"],
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "Difficulty is either: easy, medium, difficult",
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1"],
    max: [5, "Rating must be below 5"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },

  images: [String], // array of strings

  startDates: [Date], // array of dates
});

// model

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "Ramnager jim corbet park!!",
  duration: 5,
  maxGroupSize: 25,
  difficulty: "easy",
  price: 998,
  summary: "Breathtaking hike",
  imageCover: "tour-1-cover.jpg",
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => console.log("Error 💥", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App Running on port no ${port}...`);
});
