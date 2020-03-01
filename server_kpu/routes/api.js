const express = require('express');
const createError = require('http-errors');

const jwt = require('../helpers/jwt');
const db = require('../helpers/db');

const router = express.Router();

function userLoginModule(req, res, next) {
  return db.mySqlQuery(`
    SELECT id, nik, phone, email, role, name, pubKey, createdAt
    FROM users
    WHERE (nik = ? OR phone = ? OR email = ?) AND password = ?
  `, [req.body.username, req.body.username, req.body.username, req.body.password], (error, results, fields) => {
    if (error) return next(createError(500, error));
    else if (results.length <= 0) return next(createError(400, 'Username Atau Password Salah!'));
    else {
      if ('password' in results[0]) delete results[0].password;
      return res.status(200).json({
        info: '😚 Berhasil Login. Yeay! 🤩',
        result: {
          token: jwt.JwtEncode(results[0], ('remember_me' in req.body && JSON.parse(req.body.remember_me) == true))
        }
      });
    }
  });
}

function userCheckAccountModule(newUserData, res, next, registerMode) {
  let iNik = 0;
  let iPhone = 0;
  let iEmail = 0;
  if ('nik' in newUserData) {
    db.mySqlQuery(`
      SELECT id, nik, phone, email
      FROM users
      WHERE nik = ?
    `, [newUserData.nik], (error, results, fields) => {
      if (error) return next(createError(500));
      else iNik = results.length;
    });
  }
  if ('phone' in newUserData) {
    db.mySqlQuery(`
      SELECT id, nik, phone, email
      FROM users
      WHERE phone = ?
    `, [newUserData.phone], (error, results, fields) => {
      if (error) return next(createError(500));
      else iPhone = results.length;
    });
  }
  if ('email' in newUserData) {
    db.mySqlQuery(`
      SELECT id, nik, phone, email
      FROM users
      WHERE email = ?
    `, [newUserData.email], (error, results, fields) => {
      if (error) return next(createError(500));
      else iEmail = results.length;
    });
  }
  return setTimeout(() => {
    const reg = {};
    if(iNik > 0) reg.nik = 'Nik Sudah Terpakai';
    if(iPhone > 0) reg.phone = 'Nomor Telepon Sudah Terpakai';
    if(iEmail > 0) reg.email = 'Email Sudah Terpakai';
    const index = Math.max(iNik, iPhone, iEmail);
    if(index > 0) {
      return res.status(400).json({
        info: '🙄 400 - Pendaftaran Gagal! 😪',
        result: {
          message: 'Data Akun Sudah Digunakan!',
          nik: reg.nik,
          phone: reg.phone,
          email: reg.email
        }
      });
    }
    else {
      if (registerMode) return registerMode();
      return res.status(200).json({
        info: '😉 200 - Pendaftaran Dapat Dilakukan! 🤔',
        result: {
          message: 'Pendaftaran Dapat Dilanjutkan!'
        }
      });
    }
  }, 500);
}

// GET `/api`
router.get('/', function(req, res, next) {
  return next(createError(404));
});

// POST `/api/login`
router.post('/login', function(req, res, next) {
  if ('username' in req.body && 'password' in req.body) {
    return userLoginModule(req, res, next);
  }
  return res.status(400).json({
    info: '🙄 400 - Pendaftaran Gagal! 😪',
    result: {
      message: 'Invalid or incomplete data'
    }
  });
});

// POST `/api/verify`
router.post('/verify', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  return res.status(200).json({
    info: '😍 Token Selesai Di Verifikasi! UwUu~ 🥰',
    result: decoded
  });
});

// POST `/api/check-account`
router.post('/check-account', function(req, res, next) {
  let newUserData = req.body;
  if (
    'nik' in newUserData ||
    'email' in newUserData ||
    'phone' in newUserData
  ) {
    if ('nik' in newUserData) newUserData.nik = newUserData.nik.replace(/[^0-9]+/g, '');
    if ('phone' in newUserData) newUserData.phone = newUserData.phone.replace(/[^0-9]+/g, '');
    if ('email' in newUserData) newUserData.email = newUserData.email.replace(/[^0-9a-zA-Z@.]+/g, '');
    if (
      (newUserData.nik != null &&  newUserData.nik != '' &&  newUserData.nik != undefined) ||
      (newUserData.phone != null &&  newUserData.phone != '' &&  newUserData.phone != undefined) ||
      (newUserData.email != null &&  newUserData.email != '' &&  newUserData.email != undefined)
    ) {
      return userCheckAccountModule(newUserData, res, next, null);
    }
  }
  return res.status(400).json({
    info: '🙄 400 - Pendaftaran Gagal! 😪',
    result: {
      message: 'Invalid or incomplete data'
    }
  });
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
      return userCheckAccountModule(newUserData, res, next, () => {
        if(newUserData.password.length >= 128) {
          newUserData.nik = parseInt(newUserData.nik);
          newUserData.phone = newUserData.phone.toLowerCase();
          newUserData.email = newUserData.email.toLowerCase();
          newUserData.password = newUserData.password.toLowerCase();
          return db.mySqlQuery('INSERT INTO users SET ?', newUserData, (error, results, fields) => {
            if (error) return next(createError(500));
            else {
              return userLoginModule({
                body: {
                  username: newUserData.nik || newUserData.phone || newUserData.email,
                  password: newUserData.password
                }
              }, res, next);
            }
          });
        }
        return res.status(400).json({
          info: '🙄 400 - Pendaftaran Gagal! 😪',
          result: {
            message: 'Password should be hashed using SHA512'
          }
        });
      });
    }
  }
  return res.status(400).json({
    info: '🙄 400 - Pendaftaran Gagal! 😪',
    result: {
      message: 'Invalid or incomplete data'
    }
  });
});

module.exports = router;
