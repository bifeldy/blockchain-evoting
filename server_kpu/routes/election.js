const express = require('express');
const createError = require('http-errors');

const db = require('../helpers/db');
const jwt = require('../helpers/jwt');

const router = express.Router();

// GET `/api/election`
router.get('/', function(req, res, next) {
  console.log('Get All Election List');
  next(createError(500));
});

// POST `/api/election/create`
router.post('/create', function(req, res, next) {
  console.log('Create New Election');
  next(createError(500));
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
