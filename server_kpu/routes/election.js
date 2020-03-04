const express = require('express');
const createError = require('http-errors');

const db = require('../helpers/db');
const jwt = require('../helpers/jwt');
const eth = require('../helpers/eth');

const atob = require('atob');

const router = express.Router();

// GET `/api/election?status=active` `/api/election?status=inactive`
router.get('/', function(req, res, next) {
  return db.mySqlQuery(`
    SELECT id, electionId, electionName, electionIsActive, electionCreator, createdAt
    FROM elections
    ${req.query.status ? `WHERE electionIsActive = ${db.escape(req.query.status)}` : '' }
  `, null, (error, results, fields) => {
    if (error) next(createError(500));
    else {
      return res.status(200).json({
        info: `😲 200 - Election List! 😝`,
        results
      });
    }
  });
});

// POST `/api/election/create`
router.post('/create', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  if (decoded) {
    if (
      'electionName' in req.body && req.body.electionName != null && req.body.electionName != '' && req.body.electionName != undefined &&
      'electionDescription' in req.body && req.body.electionDescription != null && req.body.electionDescription != '' && req.body.electionDescription != undefined &&
      'passphrase' in req.body && req.body.passphrase != null && req.body.passphrase != '' && req.body.passphrase != undefined
    ) {
      if (
        'pubKey' in decoded.user &&
        decoded.user.pubKey != null &&
        decoded.user.pubKey != '' &&
        decoded.user.pubKey != undefined
      ) {
        const electionData = {
          electionId: web3.utils.toHex(new Date().getTime()),
          electionName: req.body.electionName,
          electionDescription: req.body.electionDescription,
          electionCreator: decoded.user.pubKey
        };
        return eth.web3CreateElection(
          electionData.electionId,
          electionData.electionName,
          electionData.electionCreator,
          atob(req.body.passphrase, decoded.user.pubKey),
          (err, trx) => {
            if (err) return next(createError(400, err));
            else {
              return db.mySqlQuery(`
                INSERT INTO elections
                SET ?
              `, electionData, (error, results, fields) => {
                if (error) return next(createError(500));
                else {
                  return res.status(200).json({
                    info: `😲 200 - Berhasil Membuat Election Baru! 😝`,
                    result: trx
                  });
                }
              });
            }
          }
        );
      }
    }
    return res.status(400).json({
      info: '🙄 400 - Gagal Membuat Election Baru! 😪',
      result: {
        message: 'Data tidak valid atau tidak lengkap'
      }
    });
  }
  return res.status(400).json({
    info: `😲 400 - Akses Dilarang! 😪`,
    result: {
      message: 'Whoops! Anda tidak memiliki akses'
    }
  });
});

// POST `/api/election/end`
router.post('/end', function(req, res, next) {
  console.log('Stop Election Periode');
  next(createError(500));
});

// POST `/api/election/:electionId`
router.post('/:electionId', function(req, res, next) {
  console.log('Show Detail Of Election By electionId');
  next(createError(500));
});

// POST `/api/election/:electionId/register`
router.post('/:electionId/register', function(req, res, next) {
  console.log('Add A New User As Voter Participant Of Election By electionId');
  next(createError(500));
});

// POST `/api/election/:electionId/participants`
router.post('/:electionId/participants', function(req, res, next) {
  console.log('Show All Voter Participant List Of Election By electionId');
  next(createError(500));
});

// POST `/api/election/:electionId/vote`
router.post('/:electionId/vote', function(req, res, next) {
  console.log('User As Voter Participant Vote Choosing Candidate Of Election By electionId');
  next(createError(500));
});

// POST `/api/election/:electionId/result`
router.post('/:electionId/result', function(req, res, next) {
  console.log('Show Current Candidate Vote Count Of Election By electionId');
  next(createError(500));
});

module.exports = router;
