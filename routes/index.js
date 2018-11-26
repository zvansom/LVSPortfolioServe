const express = require('express');
const router = express.Router();

router.post('/test', async (req, res) => {
  const { body } = req;
  body.to = 'lindsayvansomeren@gmail.com';
  await mail.send({
    body,
    filename: 'portfolio-email',
    Subject: 'New Message from your portfolio',
  });
  res.send(200);
});

module.exports = router;
