// @ts-nocheck
const express = require('express');
const createError = require('http-errors');

const db = require('../helpers/db');
const jwt = require('../helpers/jwt');
const eth = require('../helpers/eth');

const atob = require('atob');

const router = express.Router();

// GET `/api/election?status={status}&electionCreator={electionCreator}&row={row}`
router.get('/', function(req, res, next) {
  let sqlQuery = `
    SELECT id, electionId, electionName, electionDescription, electionIsActive, electionCreator, electionImage, trxAddress, createdAt
    FROM elections
  `;
  if (req.query.electionCreator) sqlQuery += ` WHERE electionCreator = ${db.escape(req.query.electionCreator)} `;
  if (req.query.status) {
    if (req.query.electionCreator) {
      if (req.query.status == 'inactive' || req.query.status == 'active') sqlQuery += ' AND ';
    }
    else if (req.query.status == 'inactive' || req.query.status == 'active') sqlQuery += ' WHERE ';
    if (req.query.status == 'inactive') sqlQuery += ' electionisActive = 0 ';
    else if (req.query.status == 'active') sqlQuery += ' electionisActive = 1 ';
  }
  sqlQuery += ' ORDER BY createdAt DESC ';
  if (parseInt(req.query.row) >= 0) sqlQuery += ` LIMIT ${db.escape(parseInt(req.query.row))} `;
  return db.mySqlQuery(sqlQuery, null, (error, results, fields) => {
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
  if (
    'electionName' in req.body && req.body.electionName != null && req.body.electionName != '' && req.body.electionName != undefined &&
    'electionDescription' in req.body && req.body.electionDescription != null && req.body.electionDescription != '' && req.body.electionDescription != undefined &&
    'passphrase' in req.body && req.body.passphrase != null && req.body.passphrase != '' && req.body.passphrase != undefined
  ) {
    const electionData = {
      electionId: eth.toHex(decoded.user.nik + new Date().getTime()),
      electionName: req.body.electionName,
      electionDescription: req.body.electionDescription,
      electionCreator: decoded.user.pubKey,
      electionImage: req.body.electionImage ? req.body.electionImage : 'http://via.placeholder.com/144x81/' + (Math.random() * 0xFFFFFF << 0).toString(16)
    };
    return eth.web3CreateElection(
      electionData.electionId,
      electionData.electionCreator,
      atob(req.body.passphrase),
      (errTrx1, trxCreateElection) => {
        if (errTrx1) return next(createError(500, errTrx1));
        else {
          electionData.trxAddress = trxCreateElection;
          return db.mySqlQuery(`
            INSERT INTO elections
            SET ?
          `, electionData, (errorSql1, resultsSql1, fieldsSql1) => {
            if (errorSql1) return next(createError(500));
            else {
              return eth.web3AddCandidate(
                electionData.electionId,
                req.body.electionCandidate,
                electionData.electionCreator,
                atob(req.body.passphrase),
                (errTrx2, trxAddCandidate) => {
                  if (errTrx2) return next(createError(500, errTrx2));
                  else {
                    let candidatesData = [];
                    req.body.electionCandidate.forEach(eC => {
                      candidatesData.push([electionData.electionId, eC, trxAddCandidate]);
                    });
                    return db.mySqlQuery(`
                      INSERT INTO candidates (electionId, candidateAddress, trxAddress)
                      VALUES ?
                    `, [candidatesData], (errorSql2, resultsSql2, fieldsSql2) => {
                      if (errorSql2) return next(createError(500));
                      else {
                        return res.status(200).json({
                          info: `😲 200 - Berhasil Membuat Election Baru! 😝`,
                          result: {
                            trxCreateElection,
                            trxAddCandidate
                          }
                        });
                      }
                    });
                  }
                }
              );
            }
          });
        }
      }
    );
  }
  return res.status(400).json({
    info: '🙄 400 - Gagal Membuat Election Baru! 😪',
    result: {
      message: 'Data tidak valid atau tidak lengkap'
    }
  });
});

// GET `/api/election/my-joined-election`
router.get('/my-joined-election', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  return db.mySqlQuery(`
    SELECT id, joined, electionId, participantAddress, createdAt
    FROM participants
    WHERE participantAddress = ?
  `, [decoded.user.pubKey], (errorSql1, resultsSql1, fieldsSql1) => {
    if (errorSql1) return next(createError(400));
    else {
      if (resultsSql1.length <= 0) {
        return res.status(200).json({
          info: `😲 200 - My Joined Election 😝`,
          results: []
        });
      }
      else {
        const allElectionId = [];
        resultsSql1.forEach(rS => {
          allElectionId.push(rS.electionId);
        });
        return db.mySqlQuery(`
          SELECT id, electionId, electionName, electionDescription, electionIsActive, electionCreator, electionImage
          FROM elections
          WHERE electionId IN ( ? )
        `, [allElectionId], (errorSql2, resultsSql2, fieldsSql2) => {
          if (resultsSql2.length <= 0) return next(createError(404));
          else {
            const joinedElections = [];
            for (let i = 0; i < resultsSql1.length; i++) {
              for (let j = 0; j < resultsSql2.length; j++) {
                if (resultsSql1[i].electionId == resultsSql2[j].electionId) {
                  joinedElections.push({
                    ...resultsSql2[j],
                    joined: resultsSql1[i].joined,
                    registeredAt: resultsSql1[i].createdAt
                  });
                }
              }
            }
            return res.status(200).json({
              info: `😲 200 - My Joined Election 😝`,
              results: joinedElections
            });
          }
        });
      }
    }
  });
});

// GET `/api/election/:id`
router.get('/:id', function(req, res, next) {
  return db.mySqlQuery(`
    SELECT id, electionId, electionName, electionDescription, electionIsActive, electionCreator, electionImage, trxAddress, createdAt
    FROM elections
    WHERE id = ?
  `, [req.params.id], (error, results, fields) => {
    if (error) return next(createError(500));
    else {
      if (results.length <= 0) return next(createError(404));
      else {
        return res.status(200).json({
          info: `😲 200 - Election #${req.params.id} 😝`,
          result: results[0]
        });
      }
    }
  });
});

// POST `/api/election/:id/end`
router.post('/:id/end', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  if (
    'passphrase' in req.body && req.body.passphrase != null && req.body.passphrase != '' && req.body.passphrase != undefined
  ) {
    return db.mySqlQuery(`
      SELECT id, electionId, electionCreator
      FROM elections
      WHERE id = ? AND electionCreator = ?
    `, [req.params.id, decoded.user.pubKey], (errorSql1, resultsSql1, fieldsSql1) => {
      if (errorSql1) return next(createError(500));
      else {
        if (resultsSql1.length <= 0) {
          return res.status(400).json({
            info: '🙄 404 - Gagal Menonaktifkan Election! 😪',
            result: {
              message: 'Election Tidak Ditemukan / Milik Orang Lain'
            }
          });
        }
        const election = resultsSql1[0];
        return eth.web3EndElection(
          election.electionId,
          decoded.user.pubKey,
          atob(req.body.passphrase),
          (errTrx, trxEndElection) => {
            if (errTrx) return next(createError(500, errTrx));
            else {
              return db.mySqlQuery(`
                UPDATE elections
                SET electionIsActive = 0
                WHERE id = ?
              `, [req.params.id], (errorSql2, resultsSql2, fieldsSql2) => {
                if (errorSql2) return next(createError(500));
                else {
                  return res.status(200).json({
                    info: `😲 200 - End Election ${election.electionId} 😝`,
                    result: {
                      trxEndElection
                    }
                  });
                }
              });
            }
          }
        );
      }
    });
  }
  return res.status(400).json({
    info: '🙄 400 - Gagal Menonaktifkan Election! 😪',
    result: {
      message: 'Data tidak valid atau tidak lengkap'
    }
  });
});

// POST `/api/election/:id/register`
router.post('/:id/register', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  return db.mySqlQuery(`
    SELECT id, electionId, electionCreator
    FROM elections
    WHERE id = ?
  `, [req.params.id], (errorSql1, resultsSql1, fieldsSql1) => {
    if (errorSql1) return next(createError(500));
    else {
      if (resultsSql1.length <= 0) return next(createError(404));
      else if (
        resultsSql1[0].electionCreator == decoded.user.pubKey ||
        decoded.user.role == 'admin' || decoded.user.pubKey == 'miner'
      ) {
        return res.status(400).json({
          info: '🙄 400 - Gagal Melakukan Pendaftaran! 😪',
          result: {
            message: 'Pemilik Tidak Dapat Berpartisipasi Sebagai Pemilih'
          }
        });
      }
      else {
        return db.mySqlQuery(`
          SELECT id, joined, electionId, participantAddress, createdAt
          FROM participants
          WHERE electionId = ? AND participantAddress = ?
        `, [resultsSql1[0].electionId, decoded.user.pubKey], (errorSql2, resultsSql2, fieldsSql2) => {
          if (errorSql2) return next(createError(500));
          else {
            if (resultsSql2.length <= 0) {
              const participantData = {
                electionId: resultsSql1[0].electionId,
                participantAddress: decoded.user.pubKey
              };
              return db.mySqlQuery(`
                INSERT INTO participants
                SET ?
              `, participantData, (errorSql3, resultsSql3, fieldsSql3) => {
                if (errorSql3) return next(createError(500));
                else {
                  return res.status(200).json({
                    info: `😲 200 - Berhasil Melakukan Pendaftaran! 😝`,
                    result: {
                      message: `Berhasil Mengajukan Diri Diajukan Sebagai Partisipan Voting`
                    }
                  });
                }
              });
            }
            else if (resultsSql2[0].joined == 0) {
              return res.status(400).json({
                info: '🙄 400 - Gagal Melakukan Pendaftaran! 😪',
                result: {
                  message: 'Pendaftaran Telah Diajukan Dan Menunggu Konfirmasi'
                }
              });
            }
            else {
              return res.status(400).json({
                info: '🙄 400 - Gagal Melakukan Pendaftaran! 😪',
                result: {
                  message: 'Sudah Terdaftar Sebagai Partisipan Dalam Voting Ini'
                }
              });
            }
          }
        });
      }
    }
  });
});

// GET `/api/election/:id/participant`
router.get('/:id/participant', function(req, res, next) {
  return db.mySqlQuery(`
    SELECT id, electionId, electionCreator
    FROM elections
    WHERE id = ?
  `, [req.params.id], (errorSql1, resultsSql1, fieldsSql1) => {
    if (errorSql1) return next(createError(500));
    else {
      if (resultsSql1.length <= 0) return next(createError(404));
      else {
        return db.mySqlQuery(`
          SELECT id, joined, electionId, participantAddress, createdAt
          FROM participants
          WHERE electionId = ?
        `, [resultsSql1[0].electionId], (errorSql2, resultsSql2, fieldsSql2) => {
          if (errorSql2) return next(createError(500));
          else {
            return res.status(200).json({
              info: `😲 200 - Election Participants #${resultsSql1[0].electionId} 😝`,
              results: resultsSql2
            });
          }
        });
      }
    }
  });
});

// POST `/api/election/:id/participant`
router.post('/:id/participant', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  if (
    'participantAddress' in req.body &&
    req.body.participantAddress != null &&
    req.body.participantAddress != '' &&
    req.body.participantAddress != undefined &&
    Array.isArray(req.body.participantAddress) &&
    'passphrase' in req.body && req.body.passphrase != null && req.body.passphrase != '' && req.body.passphrase != undefined
  ) {
    return db.mySqlQuery(`
      SELECT id, electionId, electionCreator
      FROM elections
      WHERE id = ?
    `, [req.params.id], (errorSql1, resultsSql1, fieldsSql1) => {
      if (errorSql1) return next(createError(500));
      else {
        if (resultsSql1.length <= 0) return next(createError(404));
        else if (resultsSql1[0].electionCreator == decoded.user.pubKey) {
          return eth.web3AddParticipant(
            resultsSql1[0].electionId,
            req.body.participantAddress,
            decoded.user.pubKey,
            atob(req.body.passphrase),
            (errTrx, trxAddParticipant) => {
              if (errTrx) return next(createError(500, errTrx));
              else {
                return db.mySqlQuery(`
                  UPDATE participants
                  SET joined = 1
                  WHERE electionId = ? AND participantAddress IN ( ? )
                `, [resultsSql1[0].electionId, req.body.participantAddress], (errorSql2, resultsSql2, fieldsSql2) => {
                  if (errorSql2) return next(createError(500));
                  else {
                    return res.status(200).json({
                      info: `😲 200 - Berhasil Menerima Participants #${resultsSql1[0].electionId} 😝`,
                      result: {
                        trxAddParticipant
                      }
                    });
                  }
                });
              }
            }
          );
        }
        else return next(createError(403));
      }
    });
  }
  return res.status(400).json({
    info: '🙄 400 - Gagal Melakukan Pendaftaran! 😪',
    result: {
      message: 'Data tidak valid atau tidak lengkap'
    }
  });
});

// GET `/api/election/:id/candidate`
router.get('/:id/candidate', function(req, res, next) {
  return db.mySqlQuery(`
    SELECT id, electionId, electionCreator
    FROM elections
    WHERE id = ?
  `, [req.params.id], (errorSql1, resultsSql1, fieldsSql1) => {
    if (errorSql1) return next(createError(500));
    else {
      if (resultsSql1.length <= 0) return next(createError(404));
      else {
        let candidateAddressArray = [];
        if (
          'candidateAddress' in req.query && req.query.candidateAddress != null && req.query.candidateAddress != '' && req.query.candidateAddress != undefined
        ) {
          candidateAddressArray = req.query.candidateAddress.split(',');
        }
        if (candidateAddressArray.length == 1 && (candidateAddressArray[0] == null || candidateAddressArray[0] == '' || candidateAddressArray[0] == undefined)) {
          candidateAddressArray = [];
        }
        return db.mySqlQuery(`
          SELECT id, electionId, candidateAddress
          FROM candidates
          WHERE electionId = ? ${candidateAddressArray.length <= 0 ? ' ' : ' AND candidateAddress IN ( ? ) '}
        `, 
          candidateAddressArray.length <= 0 ? [resultsSql1[0].electionId] : [resultsSql1[0].electionId, candidateAddressArray]
        , (errorSql2, resultsSql2, fieldsSql2) => {
          if (errorSql2) return next(createError(500));
          else {
            candidateAddressArray = [];
            resultsSql2.forEach(rS => {
              candidateAddressArray.push(rS.candidateAddress);
            });
            if (candidateAddressArray.length <= 0) {
              return res.status(200).json({
                info: `😲 200 - My Joined Election 😝`,
                results: []
              });
            }
            return db.mySqlQuery(`
              SELECT id, email, name, pubKey, image
              FROM users
              WHERE pubKey IN ( ? )
            `, [candidateAddressArray], (errorSql3, resultsSql3, fieldsSql3) => {
              if (errorSql3) next(createError(500));
              else if (resultsSql3.length <= 0) next(createError(404));
              else {
                let trxVoteResults = [];
                candidateAddressArray.forEach(cAA => {
                  eth.web3ShowResultCountByCandidateAddress(
                    resultsSql1[0].electionId,
                    cAA,
                    (errTrx, trxResultVoteCount) => {
                      if (errTrx) return next(createError(500, errTrx));
                      else {
                        trxVoteResults.push(trxResultVoteCount);
                        if (trxVoteResults.length == candidateAddressArray.length) {
                          return res.status(200).json({
                            info: `😲 200 - Informasi Kandidat #${resultsSql1[0].electionId} 😝`,
                            result: {
                              candidatesInfo: resultsSql3,
                              trxVoteResults
                            }
                          });
                        }
                      }
                    }
                  );
                });
              }
            });
            // return eth.web3ShowResultCountByCandidateAddress(
            //   results[0].electionId,
            //   req.query.candidateAddress,
            //   (errTrx, trxVoteResult) => {
            //     if (errTrx) return next(createError(500, errTrx));
            //     else {
            //       return res.status(200).json({
            //         info: `😲 200 - Hasil Pemilihan #${results[0].electionId} 😝`,
            //         result: {
            //           trxVoteResult
            //         }
            //       });
            //     }
            //   }
            // );
          }
        });
      }
    }
  });
});

// POST `/api/election/:id/vote`
router.post('/:id/vote', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  if (
    'candidateAddress' in req.body && req.body.candidateAddress != null && req.body.candidateAddress != '' && req.body.candidateAddress != undefined &&
    'passphrase' in req.body && req.body.passphrase != null && req.body.passphrase != '' && req.body.passphrase != undefined
  ) {
    return db.mySqlQuery(`
      SELECT id, electionId, electionCreator
      FROM elections
      WHERE id = ?
    `, [req.params.id], (errorSql1, resultsSql1, fieldsSql1) => {
      if (errorSql1) return next(createError(500));
      else {
        if (resultsSql1.length <= 0) return next(createError(404));
        else {
          return db.mySqlQuery(`
            SELECT id, joined, electionId, participantAddress, createdAt
            FROM participants
            WHERE electionId = ? AND participantAddress = ?
          `, [resultsSql1[0].electionId, decoded.user.pubKey], (errorSql2, resultsSql2, fieldsSql2) => {
            if (errorSql2) return next(createError(500));
            else {
              if (resultsSql2.length <= 0) return next(createError(404));
              else if (resultsSql2[0].joined == 1) {
                return db.mySqlQuery(`
                  SELECT id, electionId, candidateAddress
                  FROM candidates
                  WHERE electionId = ? AND candidateAddress = ?
                `, [resultsSql1[0].electionId, req.body.candidateAddress], (errorSql3, resultsSql3, fieldsSql3) => {
                  if (errorSql3) return next(createError(500));
                  else {
                    if (resultsSql3.length <= 0) return next(createError(404));
                    else {
                      return eth.web3Vote(
                        resultsSql1[0].electionId,
                        resultsSql3[0].candidateAddress,
                        decoded.user.pubKey,
                        atob(req.body.passphrase),
                        (errTrx, trxVote) => {
                          if (errTrx) return next(createError(500, errTrx));
                          else {
                            return res.status(200).json({
                              info: `😲 200 - Berhasil Melakukan Pemilihan 😝`,
                              result: {
                                trxVote
                              }
                            });
                          }
                        }
                      );
                    }
                  }
                });
              }
              else {
                return res.status(400).json({
                  info: '🙄 400 - Gagal Melakukan Pendaftaran! 😪',
                  result: {
                    message: 'Silahkan Mendaftar Sebagai Partisipan Terlebih Dahulu'
                  }
                });
              }
            }
          });
        }
      }
    });
  }
  return res.status(400).json({
    info: '🙄 400 - Gagal Melakukan Pemilihan! 😪',
    result: {
      message: 'Data tidak valid atau tidak lengkap'
    }
  });
});

// POST `/api/election/:id/my-vote`
router.post('/:id/my-vote', function(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded == null || decoded == undefined) return;
  if (
    'passphrase' in req.body && req.body.passphrase != null && req.body.passphrase != '' && req.body.passphrase != undefined
  ) {
    return db.mySqlQuery(`
      SELECT id, electionId, electionCreator
      FROM elections
      WHERE id = ?
    `, [req.params.id], (error, results, fields) => {
      if (error) return next(createError(500));
      else {
        if (results.length <= 0) return next(createError(404));
        else {
          return eth.web3ShowMyVote(
            results[0].electionId,
            decoded.user.pubKey,
            atob(req.body.passphrase),
            (errTrx, trxMyVote) => {
              if (errTrx) return next(createError(500, errTrx));
              else {
                return res.status(200).json({
                  info: `😲 200 - Hasil Pemilihan Saya 😝`,
                  result: {
                    trxMyVote
                  }
                });
              }
            }
          );
        }
      }
    });
  }
  return res.status(400).json({
    info: '🙄 400 - Gagal Melakukan Pemilihan! 😪',
    result: {
      message: 'Data tidak valid atau tidak lengkap'
    }
  });
});

module.exports = router;
