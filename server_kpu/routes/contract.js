// @ts-nocheck
const express = require('express');
const createError = require('http-errors');

const db = require('../helpers/db');
const jwt = require('../helpers/jwt');

const router = express.Router();

// GET `/api/contract`
router.get('/', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  else if (decoded.user.role == 'admin') {
    db.mySqlQuery(`
      SELECT id, active, address, abi, bytecode, createdAt, updatedAt
      FROM contracts
      ORDER BY id DESC
    `, null, (error, results, fields) => {
      if (error) next(createError(500));
      else {
        res.status(200).json({
          info: `😲 200 - Smart Contracts! 😝`,
          results: results
        });
      }
    });
  }
  else next(createError(403));
});

module.exports = router;
