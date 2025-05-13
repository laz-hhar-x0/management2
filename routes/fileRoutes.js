const express = require("express");
const router = express.Router();
const File = require("../models/File");

// 1.1 صفحة عرض كل الملفات + نموذج البحث
router.get("/Etud", async (req, res) => {
  try {
    const files = await File.find();
    res.render("Etud", { files, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("خطأ في جلب الملفات");
  }
});

// 1.2 معالجة البحث بالاسم
router.post("/searchProf", async (req, res) => {
  const name = req.body.searchText?.trim();
  if (!name) {
    return res.render("Etud", { files: [], error: "⚠️ الرجاء إدخال اسم الأستاذ" });
  }

  try {
    const found = await File.findOne({ name });
    if (!found) {
      return res.render("Etud", { files: [], error: "🚫 لا يوجد ملف بهذا الاسم" });
    }
    // وجدنا ملفًا، نعيد توجيه المستخدم إلى صفحة النتائج
    res.render("resultProf", { files: [found], error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("خطأ في البحث");
  }
});

// 1.3 تنزيل الملف
router.get("/download/:id", async (req, res) => {
  try {
    const f = await File.findById(req.params.id);
    if (!f) return res.status(404).send("الملف غير موجود");

    res.set({
      "Content-Type": f.pdfType,
      "Content-Disposition": `attachment; filename="${f.name}.pdf"`,
    });
    res.send(f.pdf);
  } catch (err) {
    console.error(err);
    res.status(500).send("فشل في تحميل الملف");
  }
});

module.exports = router;
