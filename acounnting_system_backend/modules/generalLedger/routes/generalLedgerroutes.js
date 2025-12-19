'use strict';

const express = require('express');
const router = express.Router();
const { postEntry } = require('../controllers/generalLedgerController');

router.post('/journal-entry', postEntry);

module.exports = router;
