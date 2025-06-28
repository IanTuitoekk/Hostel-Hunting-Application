const express = require('express');
const router = express.Router();            
const db = require('../app'); // Assuming you have a db module for database operations

router.post('/book', (req, res) => {
    const { userId, hostelId, startDate, endDate } = req.body;

    if (!userId || !hostelId || !startDate || !endDate) {
        return res.status(400).send("Missing required booking information");
    }

    const query = "INSERT INTO bookings (user_id, hostel_id, start_date, end_date) VALUES (?, ?, ?, ?)";
    const queryParams = [userId, hostelId, startDate, endDate];

    db.query(query, queryParams, (err, result) => {
        if (err) {
            return res.status(500).send("Error creating booking");
        }
        res.status(201).json({ bookingId: result.insertId });
    });
});
module.exports = router;