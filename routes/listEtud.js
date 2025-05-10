


const express = require("express");
const router = express.Router();
const Etud = require("../models/customerSchema2");
var moment = require("moment");

router.get("", (req, res) => {
  res.render("listEtud");
});





// POST Requst



