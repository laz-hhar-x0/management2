const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
const Etud = require("../models/customerSchema2");
const file = require("../models/File");
var moment = require("moment");

// res.render("Etud", { file }); // هذا يحل المشكلة


// GET Requst
router.get("/", (req, res) => {

  console.log("--------------------------------------------");
      res.render("welcom", { });
    }
);


router.get("/admin", (req, res) => {
  console.log("--------------------------------------------");

  Promise.all([User.find(), Etud.find()])
    .then(([users, etudiants]) => {
      res.render("admin", {
        currentPage: "admin",
        users: users,
        etudiants: etudiants,
        moment: moment
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data");
    });
});



router.get("/Prof", (req, res) => {
  console.log("--------------------------------------------");

  Promise.all([User.find(), Etud.find()])
    .then(([users, etudiants]) => {
      res.render("prof", {
        currentPage: "prof",
        users: users,
        etudiants: etudiants,
        moment: moment
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data");
    });
});


// router.get("/Etud", (req, res) => {
//   console.log("--------------------------------------------");

//   Promise.all([User.find(), Etud.find()])
//     .then(([users, etudiants]) => {
//       res.render("Etud", {
//         currentPage: "Etud",
//         users: users,
//         etudiants: etudiants,
//         moment: moment
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Error retrieving data");
//     });
// });


// router.get("/listEtud", (req, res) => {
//   // result ==> array of objects
//   console.log("--------------------------------------------");
//   Etud.find()
//     .then((result) => {
//       res.render("listEtud", { arr: result, moment: moment });
//       // console.log(result);
      
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
 
const File = require("../models/File");

router.get("/Etud", async (req, res) => {
  try {
    const [users, etudiants, file] = await Promise.all([
      User.find(),
      Etud.find(),
      File.findOne() // نحصل على أول ملف فقط
    ]);

    res.render("Etud", {
      currentPage: "Etud",
      users: users,
      etudiants: etudiants,
      file: file, // أرسل الملف إلى EJS
      moment: moment
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("حدث خطأ في الخادم");
  }
});




router.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/editEtud/:id", (req, res) => {
  Etud.findById(req.params.id)
    .then((result) => {
      res.render("user/editEtud", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/view/:id", (req, res) => {
  // result ==> object
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/viewEtud/:id", (req, res) => {
  // result ==> object
  Etud.findById(req.params.id)
    .then((result) => {
      res.render("user/viewEtud", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});




// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// POST Request


// router.post("/search", (req, res) => {
//   console.log("*******************************");

//   const searchText = req.body.searchText.trim();

//   User.find({ $or: [{ fireName: searchText }, { lastName: searchText }] })
//     .then((result) => {
//       console.log(result);
//       res.render("user/search", { arr: result, moment: moment });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


// router.post("/searchEtud", (req, res) => {
//   console.log("*******************************");

//   const searchTextEtud = req.body.searchText.trim();

//   Etud.find({ $or: [{ fireName: searchTextEtud }, { lastName: searchTextEtud }] })
//     .then((result) => {
//       console.log(result);
//       res.render("user/searchEtud", { arr: result, moment: moment });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });




// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// DELETE Request
router.delete("/delet/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deletEtud/:id", (req, res) => {
  Etud.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
});




// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// PUT Requst
router.put("/edit/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/editEtud/:id", (req, res) => {
  Etud.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
});




// router.post('/searchProf', async (req, res) => {
//   const searchText = req.body.searchText.trim();

//   try {
//     const matchedFile = await file.findOne({ firstName: searchText }); // ✅ اسم جديد
//     const [users, etudiants] = await Promise.all([
//       User.find(),
//       Etud.find()
//     ]);

//     if (!matchedFile) {
//       return res.render("Etud", {
//         currentPage: "Etud",
//         users,
//         etudiants,
//         file: null,
//         files: [],
//         searchResult: null,
//         moment,
//         error: "🚫 الأستاذ غير موجود"
//       });
//     }

//     const profFile = {
//       name: matchedFile.firstname,
//       _id: matchedFile.fileId
//     };

//     res.render("Etud", {
//       currentPage: "Etud",
//       users,
//       etudiants,
//       file: null,
//       searchResult: [profFile],
//       files: [],
//       moment,
//       error: null
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("⚠️ خطأ في السيرفر");
//   }
// });



router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).send("الملف غير موجود");

    const filePath = path.join(__dirname, "../uploads", file.filename); // حسب مكان تخزين الملفات
    res.download(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).send("خطأ أثناء تحميل الملف");
  }
});





module.exports = router;
