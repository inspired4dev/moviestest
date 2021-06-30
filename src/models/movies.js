const mongoose = require("mongoose");
const { Schema } = mongoose;

const moviesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    required: true,
  },
  urlTrailer: {
    type: String,
    required: true,
  },
  urlImg: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("movies", moviesSchema);
