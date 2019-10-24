const express = require('express');
const router = express.Router();

// api/demo
router.post('/', (req, res, next) => {
  console.log(req.headers);
  console.log(req.rawHeaders);
  console.log(req.query);
  console.log(req.body);

  res.send({ message: 'this is demo route' });
});

// api/demo/chat
router.post('/chat', (req, res, next) => {
  res.send('this is demo/chat route');
});

module.exports = router;
