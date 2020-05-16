// @ts-nocheck
const express = require('express');
const createError = require('http-errors');

const db = require('../helpers/db');

const router = express.Router();

// GET `/api/dump`
router.get('/', function(req, res, next) {
  db.mySqlQuery(`
    SELECT id, blockHash, blockNumber, contractAddress, cumulativeGasUsed, transactions.from, gasUsed, logsBloom, status, transactions.to, transactionHash, transactionIndex, createdAt
    FROM transactions
    ORDER BY id DESC
  `, null, (error, results, fields) => {
    if (error) next(createError(500));
    else {
      res.status(200).json({
        info: `😲 200 - Transaction Via Website Dump Record! 😝`,
        results: results
      });
    }
  });
});

// GET `/api/dump/:transactionHash`
router.get('/:transactionHash', function(req, res, next) {
  db.mySqlQuery(`
    SELECT id, blockHash, blockNumber, contractAddress, cumulativeGasUsed, transactions.from, gasUsed, logsBloom, status, transactions.to, transactionHash, transactionIndex, createdAt
    FROM transactions
    WHERE transactionHash = ?
  `, [req.params.transactionHash], (error, results, fields) => {
    if (error) next(createError(500));
    else {
      res.status(200).json({
        info: `😲 200 - Transaction Via Website Dump Record! 😝`,
        result: results[0]
      });
    }
  });
});

module.exports = router;
