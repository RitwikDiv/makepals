// Getting express
const express = require('express');

// Initializing router
const router = express.Router();

// Api calls
router.get('/', (req, res) => {
    res.render('index', { title: "MakePals API", message: "Welcome to MakePals API! Check out the project github page to see the endpoints." });
});

module.exports = router;