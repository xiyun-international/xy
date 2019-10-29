var io = require('socket.io').listen(3001);

io.on('connection', function(socket) {
  // 监听客户端的dialog事件
  socket.on('dialog', function(data) {
    setTimeout(() => {
      socket.emit('task-info', '插件开始安装');
    }, 400);
    setTimeout(() => {
      socket.emit('task-info', '[1/2]插件正在安装');
    }, 800);
    setTimeout(() => {
      socket.emit('task-finish', '插件安装完成');
    }, 1000);
  });

  // 挂在到全局让其他文件使用
  global.socket = socket;
});
