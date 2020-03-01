const express = require('express');
const createError = require('http-errors');

const db = require('../helpers/db');
const jwt = require('../helpers/jwt');
const eth = require('../helpers/eth');

const router = express.Router();

// GET `/api/user`
router.get('/', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  else if (decoded.user.role == 'admin') {
    db.mySqlQuery(`
      SELECT id, nik, phone, email, role, name, pubKey, createdAt, updatedAt
      FROM users
    `, null, (error, results, fields) => {
      if (error) next(createError(500));
      else if (results.length <= 0) next(createError(404));
      else {
        for (const r of results) {
          if ('password' in r) delete r.password;
        }
        res.status(200).json({
          info: `😲 200 - User Profile! 😝`,
          results
        });
      }
    });
  }
  else next(createError(403));
});

// POST `/api/user/profile`
router.post('/profile', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  else {
    db.mySqlQuery(`
      SELECT id, nik, phone, email, role, name, pubKey, createdAt
      FROM users
      WHERE nik = ?
    `, [req.params.nik], (error, results, fields) => {
      if (error) next(createError(500));
      else if (results.length <= 0) next(createError(404));
      else {
        if ('password' in results[0]) delete results[0].password;
        res.status(200).json({
          info: `😲 200 - User Profile! 😝`,
          result: results[0]
        });
      }
    });
  }
});

// POST `/api/user/export`
router.get('/export', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  else if ('pubKey' in decoded.user) {
    eth.web3ExportAccount(decoded.user.pubKey, function(files) {
      if (files) res.download(files);
      else next(createError(404));
    });
  }
  else next(createError(400));
});

// POST `/api/user/import`
router.post('/import', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  else {
    next(createError(500));
  }
});

// GET `/api/user/:id`
router.get('/:id', function(req, res, next) {
  let decoded = req.headers['authorization'] || req.headers['x-access-token'] || req.body.token || '';
  if (decoded) {
    decoded = jwt.JwtDecode(req, res, next);
  }
  if (decoded != null) {
    db.mySqlQuery(`
      SELECT id, role, name, pubKey, createdAt
      FROM users
      WHERE id = ?
    `, [req.params.id], (error, results, fields) => {
      if (error) next(createError(500));
      else if (results.length <= 0) next(createError(404));
      else {
        if (!decoded || (decoded.user.id != req.params.id && decoded.user.role != 'admin')) {
          if ('nik' in results[0]) delete results[0].nik;
          if ('email' in results[0]) delete results[0].email;
          if ('telepon' in results[0]) delete results[0].telepon;
        }
        if ('password' in results[0]) delete results[0].password;
        res.status(200).json({
          info: `😲 200 - User Profile! 😝`,
          result: results[0]
        });
      }
    });
  }
});

module.exports = router;
