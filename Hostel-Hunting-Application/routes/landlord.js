const express = require("express");
const router = express.Router();    
const db = require("../app");
 // Assuming you have a db module for database operations
router.get("/landlord", (req, res) => {
    // Check if the user is logged in and is a landlord
    if (!req.session.isLandlord) {
        return res.status(403).send("Access denied");
    }

    // Render the landlord dashboard or perform any other actions
    res.sendFile("landlord-dashboard.html", { root: "Frontend" });
});
router.get("/landlord/hostels", (req, res) => {
    // Fetch hostels managed by the landlord
    const landlordId = req.session.userId; // Assuming userId is stored in session
    db.query("SELECT * FROM hostels WHERE landlord_id = ?", [landlordId], (err, results) => {
        if (err) {
            return res.status(500).send("Error fetching hostels");
        }
        res.json(results);
    });
});
router.post("/landlord/hostels", (req, res) => {
    // Add a new hostel
    const { name, location, price, amenities } = req.body;
    const landlordId = req.session.userId; // Assuming userId is stored in session
    db.query("INSERT INTO hostels (name, location, price, amenities, landlord_id) VALUES (?, ?, ?, ?, ?)", 
        [name, location, price, amenities, landlordId], (err) => {
            if (err) {
                return res.status(500).send("Error adding hostel");
            }
            res.status(201).send("Hostel added successfully");
        });
});
router.put("/landlord/hostels/:id", (req, res) => {
    // Update an existing hostel
    const hostelId = req.params.id;
    const { name, location, price, amenities } = req.body;
    db.query("UPDATE hostels SET name = ?, location = ?, price = ?, amenities = ? WHERE id = ?", 
        [name, location, price, amenities, hostelId], (err) => {
            if (err) {
                return res.status(500).send("Error updating hostel");
            }
            res.send("Hostel updated successfully");
        });
});
router.delete("/landlord/hostels/:id", (req, res) => {
    // Delete a hostel
    const hostelId = req.params.id;
    db.query("DELETE FROM hostels WHERE id = ?", [hostelId], (err) => {
        if (err) {
            return res.status(500).send("Error deleting hostel");
        }
        res.send("Hostel deleted successfully");
    });
});
router.get("/landlord/bookings", (req, res) => {
    // Fetch bookings for the landlord's hostels
    const landlordId = req.session.userId; // Assuming userId is stored in session
    db.query("SELECT b.*, h.name FROM bookings b JOIN hostels h ON b.hostel_id = h.id WHERE h.landlord_id = ?", 
        [landlordId], (err, results) => {
            if (err) {
                return res.status(500).send("Error fetching bookings");
            }
            res.json(results);
        });
});
module.exports = router;
