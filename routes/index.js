const express = require('express');
const router = express.Router();

router.post('/test', (req, res) => {
  console.log('hit');
  console.log('body', req.body)
});

module.exports = router;
