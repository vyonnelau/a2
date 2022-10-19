/*
  File name:      users.js
  Student’s Name: LAU, Wai Yung
  Student ID:     301269737
  Date:           18 Oct 2022
*/

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Placeholder");
});

module.exports = router;
