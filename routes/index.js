const express = require('express');
const mail = require('../mail');
const cors = require('cors');

const router = express.Router();

router.post('/test', cors(), async (req, res) => {
  const { body } = req;
  body.to = 'lindsayvansomeren@gmail.com';
  const response = await mail.send({
    body,
    filename: 'portfolio-email',
    Subject: 'New Message from your portfolio',
  });
  await res.send(response);
});

module.exports = router;
