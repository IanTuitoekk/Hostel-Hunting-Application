const express = require('express');
const router = express.Router();    
const db = require('../app'); // Assuming you have a db module for database operations

router.get('/search', (req, res) => {
    const { city, priceRange, amenities, name, location } = req.query;

    let query = "SELECT * FROM hostels WHERE 1=1";
    const queryParams = [];

    if (name) {
        query += " AND LOWER(name) LIKE ?";
        queryParams.push(`%${name.toLowerCase()}%`);
    }

    if (location) {
        // Assuming 'city' and 'address' columns exist for location
        query += " AND (LOWER(city) LIKE ? OR LOWER(address) LIKE ?)";
        queryParams.push(`%${location.toLowerCase()}%`, `%${location.toLowerCase()}%`);
    }

    if (city) {
        query += " AND city = ?";
        queryParams.push(city);
    }

    if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        query += " AND price BETWEEN ? AND ?";
        queryParams.push(minPrice, maxPrice);
    }

    if (amenities) {
        const amenitiesList = amenities.split(',');
        amenitiesList.forEach(amenity => {
            query += " AND amenities LIKE ?";
            queryParams.push(`%${amenity.trim()}%`);
        });
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).send("Error fetching hostels");
        }
        res.json(results);
    });
});
module.exports = router;    