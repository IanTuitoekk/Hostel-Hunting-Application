const express = require("express");
const router = express.Router();

// Example route
router.get("/admin", (req, res) => {
    res.send("Welcome to the Admin Dashboard");
});

module.exports = router;
