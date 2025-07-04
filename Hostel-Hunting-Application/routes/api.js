const express = require('express');
const router = express.Router();
const db = require('../app'); 

router.get('/hostels', (req, res) => {
    db.query("SELECT * FROM hostels",(err, hostels) => {
        if (err) {
            return res.status(500).send("Error fetching hostels");
        }
        res.json(hostels);
    });
});
router.get('/user', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ username: req.session.user.username });
    } else {
        res.json({ username: null });
    }
});
router.get('/HostelOwner', (req, res) => {
    if (req.session && req.session.isHostelOwner) {
        res.json({ isHostelOwner: true });
    } else {
        res.json({ isHostelOwner: false });
    }
});
router.get('/admin', (req, res) => {
    if (req.session && req.session.isAdmin) {
        res.json({ isAdmin: true });
    } else {
        res.json({ isAdmin: false });
    }
});
module.exports = router;