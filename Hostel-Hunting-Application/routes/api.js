const express = require('express');
const router = express.Router();
const db = require('../../app'); // Assuming you have a db module for database operations

router.get('/hostels', (req, res) => {
    db.query("SELECT * FROM hostels",(err, hostels) => {
        if (err) {
            return res.status(500).send("Error fetching hostels");
        }
        res.json(hostels);
    });
});
module.exports = router;