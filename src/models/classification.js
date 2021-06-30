const mongoose = require("mongoose");
const { Schema } = mongoose;

const classificationSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("classification", classificationSchema);
