//IMPORT MODULES
const mongoose = require("mongoose");

//VARIABLES DEFINITION
const URI =
  "mongodb+srv://inspired4dev:3166154383mM.@cluster0.6i58m.mongodb.net/movies?retryWrites=true&w=majority";

//DATABASE FUNCTION
async function connectDatabase() {
  try {
    return await mongoose.connect(URI);
  } catch (err) {
    throw new Error("Cannot Connect Database");
  }
}

//EXPORT FUNCTIONS
module.exports = connectDatabase;
