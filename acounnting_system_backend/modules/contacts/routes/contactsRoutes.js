'use strict';

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.post('/', contactController.create);
router.get('/', contactController.list);
router.get('/:id', contactController.getById);
router.put('/:id', contactController.update);
router.delete('/:id', contactController.remove);

module.exports = router;
