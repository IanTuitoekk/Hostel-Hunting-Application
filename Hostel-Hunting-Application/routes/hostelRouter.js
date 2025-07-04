const express = require("express");
const router = express.Router();
const hostelUploadController = require("../controllers/hostel-upload");

// Route to add a hostel with image upload
router.post(
  "/add-hostel",
  hostelUploadController.upload.single("image"),
  hostelUploadController.addHostel
);

// Route to get all hostels
router.get("/all-hostels", hostelUploadController.getAllHostels);

module.exports = router; 