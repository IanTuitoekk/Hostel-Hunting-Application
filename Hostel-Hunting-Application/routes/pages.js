const express = require('express');
const router = express.Router();
const db = require('../../app'); // Assuming you have a db module for database operations

router.get('/login', (req, res) => {
    res.sendFile('loginform.html', { root: 'public' });
});
router.get('/register', (req, res) => {
    res.sendFile('registration.html', { root: 'public' });
});
router.get('/api/users', (req, res) => {
    res.json({ username: req.session.username || null });
    });
router.get('/admin', (req, res) => {
    if (!req.session.isAdmin) {
                return res.status(403).send("Access denied");

    }res.sendFile("admin.html", { root: "public" });
});
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error logging out");
        res.redirect("/login");
    });
});


module.exports = router;