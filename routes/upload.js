const multer = require("multer");
const path = require("path");
const fs = require("fs");

// إعداد التخزين
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // تأكد أن مجلد uploads موجود
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// router.post("/upload", upload.single("pdf"), async (req, res) => {
//   const profName = req.body.name;

//   try {
//     const userExists = await User.findOne({ name: FisrtName });

//     if (!userExists) {
//       // حذف الملف إذا تم رفعه ولكن الأستاذ غير موجود
//       if (req.file) {
//         fs.unlinkSync(req.file.path);
//       }

//       return res.status(400).send("هذا الأستاذ غير موجود في قاعدة البيانات");
//     }

//     // إذا كان الأستاذ موجود، احفظ المعلومات في قاعدة البيانات (إن كانت لديك Model لهذا)
//     // مثال:
//     // await ProfPDF.create({ name: profName, filePath: req.file.path });

//     res.send("تم رفع الملف بنجاح");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("حدث خطأ أثناء الرفع");
//   }
// });
