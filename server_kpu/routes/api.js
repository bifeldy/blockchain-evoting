const express = require('express');
const createError = require('http-errors');

const jwt = require('../helpers/jwt');
const db = require('../helpers/db');

const router = express.Router();

// GET `/api`
router.get('/', function(req, res, next) {
  next(createError(404));
});

// POST `/api/login`
router.post('/login', function(req, res, next) {
  if ('username' in req.body && 'password' in req.body) {
    const rememberMe = ('remember_me' in req.body && JSON.parse(req.body.remember_me) == true);
    db.mySqlQuery(`
      SELECT id, nik, phone, email, role, name, pubKey, createdAt, updatedAt FROM users
      WHERE (nik = ? OR phone = ? OR email = ?) AND password = ?
    `, [req.body.username, req.body.username, req.body.username, req.body.password], (error, results) => {
      if (error) next(createError(500, error));
      else if (results.length <= 0) next(createError(400, 'Username Atau Password Salah!'));
      else {
        if ('password' in results[0]) delete results[0].password;
        res.status(200).json({
          info: '😚 Berhasil Login. Yeay! 🤩',
          result: {
            token: jwt.JwtEncode(results[0], rememberMe)
          }
        });
      }
    });
  }
  else next(createError(400));
});

// POST `/api/verify`
router.post('/verify', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  else {
    res.status(200).json({
      info: '😍 Token Selesai Di Verifikasi! UwUu~ 🥰',
      result: decoded
    });
  }
});

// POST `/api/register`
router.post('/register', function(req, res, next) {
  let newUserData = req.body;
  if (
    'nik' in newUserData &&
    'name' in newUserData &&
    'email' in newUserData &&
    'phone' in newUserData &&
    'password' in newUserData
  ) {
    newUserData.nik = newUserData.nik.replace(/[^0-9]+/g, '');
    newUserData.phone = newUserData.phone.replace(/[^0-9]+/g, '');
    newUserData.email = newUserData.email.replace(/[^0-9a-zA-Z@.]+/g, '');
    newUserData.name = newUserData.name.replace(/[^a-zA-Z\s]+/g, '');
    if (
      newUserData.nik != null &&  newUserData.nik != '' &&  newUserData.nik != undefined &&
      newUserData.phone != null &&  newUserData.phone != '' &&  newUserData.phone != undefined &&
      newUserData.email != null &&  newUserData.email != '' &&  newUserData.email != undefined &&
      newUserData.name != null &&  newUserData.name != '' &&  newUserData.name != undefined &&
      newUserData.password != null &&  newUserData.password != '' &&  newUserData.password != undefined
    ) {
      let iNik, iPhone, iEmail;
      db.mySqlQuery(`
        SELECT * FROM users
        WHERE nik = ?
      `, [newUserData.nik], (error, results) => {
        if (error) next(createError(500));
        else iNik = results.length;
      });
      db.mySqlQuery(`
        SELECT * FROM users
        WHERE phone = ?
      `, [newUserData.phone], (error, results) => {
        if (error) next(createError(500));
        else iPhone = results.length;
      });
      db.mySqlQuery(`
        SELECT * FROM users
        WHERE email = ?
      `, [newUserData.email], (error, results) => {
        if (error) next(createError(500));
        else iEmail = results.length;
      });
      const index = Math.max(iNik, iPhone, iEmail);
      if(index > 0) {
        const result = {};
        if(iNik > 0) result.nik = 'Nik Sudah Terpakai';
        if(iPhone > 0) result.phone = 'Nomor Telepon Sudah Terpakai';
        if(iEmail > 0) result.email = 'Email Sudah Terpakai';
        res.status(400).json({
          info: '🙄 400 - Pendaftaran Gagal! 😪',
          result
        });
      }
      else if(newUserData.password.length >= 128) {
        newUserData.nik = parseInt(newUserData.nik);
        newUserData.phone = parseInt(newUserData.phone);
        newUserData.email = newUserData.email.toLowerCase();
        newUserData.password = newUserData.password.toLowerCase();
        db.mySqlQuery('INSERT INTO users SET ?', newUserData, (error, results) => {
          if (error) next(createError(500));
          else {
            if ('password' in newUserData) delete newUserData.password;
            res.status(200).json({
              info: '😘 200 - Pendaftaran Berhasil! 😁',
              result: {
                token: jwt.JwtEncode(newUserData)
              }
            });
          }
        });
      }
      else {
        res.status(400).json({
          info: '🙄 400 - Pendaftaran Gagal! 😪',
          result: {
            message: 'Password should be hashed using SHA512'
          }
        });
      }
    }
  }
  else {
    res.status(400).json({
      info: '🙄 400 - Pendaftaran Gagal! 😪',
      result: {
        message: 'Invalid or incomplete data'
      }
    });
  }
});

module.exports = router;
