


const express = require("express");
const router = express.Router();
const Etud = require("../models/customerSchema2");
var moment = require("moment");

router.get("", (req, res) => {
  res.render("user/addEtud");
});

// POST Requst
router.post("", (req, res) => {
  Etud.create(req.body)
    .then(() => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;


