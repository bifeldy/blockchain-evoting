const express = require('express');

const router = express.Router();

// GET `/`
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
