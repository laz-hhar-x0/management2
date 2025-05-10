// models/File.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  pdf: Buffer,
  pdfType: String,
});

module.exports = mongoose.model("PDf", fileSchema);
