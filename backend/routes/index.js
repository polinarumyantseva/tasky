const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/users', require('./users'));
router.use('/projects', require('./project'));
router.use('/timer', require('./timer'));

module.exports = router;
