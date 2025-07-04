const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");

// Use all routes from admincontroller
router.use("/", adminController);

module.exports = router;
