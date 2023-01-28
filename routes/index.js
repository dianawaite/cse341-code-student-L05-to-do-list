const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/todo', require('./todo'))

module.exports = router; 