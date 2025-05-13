// // models/File.js
// const mongoose = require("mongoose");

// const fileSchema = new mongoose.Schema({
//   name: String,
//   pdf: Buffer,
//   pdfType: String,
// });

// module.exports = mongoose.model("PDf", fileSchema);
// ------------------------------------------------------------------



// const mongoose = require("mongoose");

// const fileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   pdf: { type: Buffer, required: true },
//   pdfType: { type: String, required: true }
// });

// module.exports = mongoose.model("File", fileSchema);





const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },    // اسم الأستاذ
  pdf: { type: Buffer, required: true },      // البيانات الثنائية للملف
  pdfType: { type: String, required: true }   // نوع المحتوى (application/pdf)
});

module.exports = mongoose.model("File", fileSchema);
