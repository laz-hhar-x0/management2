// routes/uploadRoute.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const File = require("../models/File");

// إعداد multer لحفظ الملف في الذاكرة
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/upload", (req, res) => {
  res.render("upload"); // صفحة الرفع
});

router.post("/upload", upload.single("pdf"), async (req, res) => {
  const file = new File({
    name: req.body.name,
    pdf: req.file.buffer,
    pdfType: req.file.mimetype,
  });

  try {
    await file.save();
    res.json({ message: "تم رفع الملف بنجاح ✅" });
    res.render("Etud", {});
  } catch (err) {
    res.status(400).send("حدث خطأ أثناء رفع الملف ❌");
  }
});

module.exports = router;
