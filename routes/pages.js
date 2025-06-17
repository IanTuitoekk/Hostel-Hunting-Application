const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile('loginform.html', { root: 'public' });
});
router.get('/register', (req, res) => {
    res.sendFile('registration.html', { root: 'public' });
});
module.exports = router;