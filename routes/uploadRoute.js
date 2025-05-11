// routes/uploadRoute.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const File = require("../models/File");
const User = require("../models/customerSchema"); // تأكد أن المسار صحيح
const Customer = require('../models/customerSchema');  // تأكد من مسار الملف

// إعداد multer لحفظ الملف في الذاكرة
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/check-prof", async (req, res) => {
  const { name } = req.body;

  try {
    const exists = await Customer.exists({ firstName: name });
    res.json({ exists: !!exists });
  } catch (err) {
    console.error("خطأ أثناء التحقق من الاسم:", err);
    res.status(500).json({ exists: false, error: "حدث خطأ بالخادم" });
  }
});


router.get("/upload", (req, res) => {
  res.render("upload"); // صفحة الرفع
});

// router.post("/upload", upload.single("pdf"), async (req, res) => {
//   const file = new File({
//     name: req.body.name,
//     pdf: req.file.buffer,
//     pdfType: req.file.mimetype,
//   });

//   try {
//     await file.save();
//     res.json({ message: "تم رفع الملف بنجاح ✅" });
//   } catch (err) {
//     res.status(400).send("حدث خطأ أثناء رفع الملف ❌");
//   }
// });
router.post("/upload", upload.single("pdf"), async (req, res) => {
  const { name } = req.body;

  try {
    // تحقق إذا الاسم موجود في مجموعة User حسب firstName
    const prof = await User.findOne({ firstName: name });

    if (!prof) {
      return res.status(404).json({ message: "❌ هذا الأستاذ غير موجود في المستخدمين" });
    }

    // إذا تم العثور على الأستاذ، نقوم بحفظ الملف
    let file = await File.findOne({ name });

    if (file) {
      // تحديث الملف الموجود إذا كان الملف موجودًا
      file.pdf = req.file.buffer;
      file.pdfType = req.file.mimetype;
    } else {
      // إنشاء ملف جديد إذا لم يكن موجودًا
      file = new File({
        name,
        pdf: req.file.buffer,
        pdfType: req.file.mimetype,
      });
    }

    await file.save();
    res.json({ message: "✅ تم حفظ/تحديث الملف بنجاح" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ حدث خطأ أثناء حفظ الملف" });
  }
});


module.exports = router;
