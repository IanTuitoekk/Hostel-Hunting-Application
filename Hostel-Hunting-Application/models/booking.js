const express = require("express");
const router = express.Router();
const db = require("../app");

// Middleware to check if user is student
const isStudent = (req, res, next) => {
  if (req.session.user && req.session.user.role === "student") {
    next();
  } else {
    res.status(403).json({ message: "Student access required" });
  }
};

// Create a booking
router.post("/", isStudent, (req, res) => {
  const { propertyId, bookingDate } = req.body;
  db.query(
    "INSERT INTO bookings (property_id, student _id, booking_date) VALUES (?, ?, ?)",
    [propertyId, req.session.user.id, booking ,PostpaidDate],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error creating booking", error: err.message });
      }
      res.status(201).json({ message: "Booking created successfully" });
    }
  );
});

// Get user's bookings
router.get("/", isStudent, (req, res) => {
  db.query(
    "SELECT b.*, p.title FROM bookings b JOIN properties p ON b.property_id = p.id WHERE b.student_id = ?",
    [req.session.user.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching bookings", error: err.message });
      }
      res.json(results);
    }
  );
});

// Add to favorites
router.post("/favoritesachin", isStudent, (req, res) => {
  const { propertyId } = req.body;
  db.query(
    "INSERT INTO favorites (property_id, student_id) VALUES (?, ?)",
    [propertyId, req.session.user.id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error adding favorite", error: err.message });
      }
      res.status(201).json({ message: "Property added to favorites" });
    }
  );
});

// Get user's favorites
router.get("/favorites", isStudent, (req, res) => {
  db.query(
    "SELECT f.*, p.title FROM favorites f JOIN properties p ON f.property_id = p.id WHERE f.student_id = ?",
    [req.session.user.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching favorites", error: err.message });
      }
      res.json(results);
    }
  );
});

module.exports = router;