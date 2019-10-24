const express = require('express');
const router = express.Router();

// 注册各个控制器的路由
router.use('/demo', require('./controller/Demo'));

module.exports = router;
