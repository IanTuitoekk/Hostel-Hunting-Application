const express = require('express');
const router = express.Router();
const db = require('../app'); 


router.get("/", (req, res) => {
    res.sendFile("index.html", { root: "Frontend" });
});
router.get('/login', (req, res) => {
    res.sendFile('loginform.html', { root: 'Frontend' });
});
router.get('/register', (req, res) => {
    res.sendFile('registration.html', { root: 'Frontend' });
});
router.get('/api/users', (req, res) => {
    res.json({ username: req.session.username || null });
    });
router.get('/admin', (req, res) => {
    if (!req.session.isAdmin) {
                return res.status(403).send("Access denied");

    }res.sendFile("admin-dashboard.html", { root: "Frontend" });
});
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error logging out");
        res.redirect("/login");
    });
});


module.exports = router;