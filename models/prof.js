// models/prof.js
const mongoose = require("mongoose");

const profSchema = new mongoose.Schema({
  firstname: String,
  // هذا الحقل ضروري لتخزين الـ ObjectId الخاص بالملف
  fileId: mongoose.Schema.Types.ObjectId 
});

module.exports = mongoose.model("Prof", profSchema);
