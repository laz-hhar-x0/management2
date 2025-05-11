// routes/checkProfRoute.js
const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema"); // استدعاء موديل les-profs

router.post("/check-prof", async (req, res) => {
  const { name } = req.body;

  try {
    // التحقق من الاسم الأول فقط
    const found = await User.findOne({ firstName: name });

    if (found) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطأ في التحقق من الاسم" });
  }
});

module.exports = router;