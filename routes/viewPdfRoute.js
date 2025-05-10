const express = require("express");
const router = express.Router();
const File = require("../models/File");

// صفحة تعرض الـ PDF في واجهة
router.get("/view-pdf/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).send("الملف غير موجود");

    res.render("viewPdf", { file });
  } catch (err) {
    res.status(500).send("حدث خطأ في الخادم");
  }
});

// Endpoint يقدم الملف نفسه مباشرة
router.get("/Etud", async (req, res) => {
  try {
    const files = await File.find();
    res.render("Etud", { files }); // ✅ مهم جدًا: تمرير الملفات
  } catch (err) {
    res.status(500).send("حدث خطأ أثناء جلب البيانات");
  }
});


module.exports = router;
