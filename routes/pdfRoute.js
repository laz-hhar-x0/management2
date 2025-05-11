const express = require("express");
const router = express.Router();
const File = require("../models/File");

// صفحة تعرض كل الملفات
router.get("/Etud", async (req, res) => {
  try {
    const files = await File.find();
    res.render("Etud", { files });
  } catch (err) {
    res.status(500).send("خطأ في جلب الملفات");
  }
});

// Endpoint لتحميل PDF
router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).send("الملف غير موجود");

    res.set({
      "Content-Type": file.pdfType,
      "Content-Disposition": `attachment; filename="${file.name}.pdf"`,
    });

    res.send(file.pdf);
  } catch (err) {
    res.status(500).send("فشل في تحميل الملف");
  }
});

module.exports = router;