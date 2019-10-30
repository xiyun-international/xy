var io = require('socket.io').listen(3001);

io.on('connection', function(socket) {
  // 挂在到全局让其他文件使用
  global.socket = socket;
});
