const express = require('express');
const request = require('request');

const router = express.Router();

const env = require(`${__dirname}/../environments/environment.js`);

const recaptchaApiUrl = 'https://www.google.com/recaptcha/api/siteverify';

// GET `/api/kpu/cek-nik`
router.post('/cek-nik', function(req, res, next) {
  let newUserData = req.body;
  if(
    'nik' in newUserData ||
    'email' in newUserData ||
    'g-recaptcha-response' in newUserData
  ) {
    newUserData.nik = newUserData.nik.replace(/[^0-9]+/g, '');
    newUserData.name = newUserData.name.replace(/[^a-zA-Z\s]+/g, '');
    if(
      newUserData.nik != null &&  newUserData.nik != '' &&  newUserData.nik != undefined &&
      newUserData.name != null &&  newUserData.name != '' &&  newUserData.name != undefined &&
      newUserData['g-recaptcha-response'] != null && newUserData['g-recaptcha-response'] != '' && newUserData['g-recaptcha-response'] != undefined
    ) {
      console.log('[ReCAPTCHA] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m', req.body['g-recaptcha-response'], req.connection.remoteAddress);
      return request(`
        ${recaptchaApiUrl}?secret=${env.reCaptchaSecretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}
      `.trim(), (e1, r1, b1) => {
        b1 = JSON.parse(b1);
        if (b1.success !== undefined && !b1.success) {
          return res.json({
            info: '🙄 400 - Wrong Captcha! 😪',
            result: {
              message: 'Captcha Salah / Expired'
            }
          });
        }
        return request({
          method: 'POST',
          uri: env.apiKpuAndroid,
          body: JSON.stringify({
            nik: newUserData.nik,
            nama: newUserData.name,
            ck_kpu: env.kpuAndroidSecretKey
          })
        }, (e2, r2, b2) => {
          return res.json({
            info: '🙄 400 - Data Kartu Tanda Penduduk! 😪',
            result: JSON.parse(b2)
          });
        });
      });
    }
    return res.status(400).json({
      info: '🙄 400 - No Captcha! 😪',
      result: {
        message: 'Harap Centang Captcha'
      }
    });
  }
  return res.status(400).json({
    info: '🙄 400 - Pendaftaran Gagal! 😪',
    result: {
      message: 'Invalid or incomplete data'
    }
  });
});

module.exports = router;
