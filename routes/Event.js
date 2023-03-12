const express = require('express');
const router = express.Router();

const { 
  join
} = require('../controllers/Event');

router.post('/join', join);

module.exports = router;