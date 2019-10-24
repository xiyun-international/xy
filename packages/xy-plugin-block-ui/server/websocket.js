const express = require('express');
const WebSocket = require('ws');
const { createServer } = require('http');

const app = express();

module.exports = function(port) {
  // 使用 websocket
  const server = createServer(app);
  const wss = new WebSocket.Server({ server });
  wss.on('connection', function connection(ws) {
    console.log('a user connected');

    ws.on('message', function incoming(message) {
      message = JSON.parse(message);
      if (message.type === 'chat') {
        console.log('received: %s', message.data);
        ws.send('嗯，收到啦！');
      }
    });

    ws.send('something');

    ws.on('close', function() {
      console.log('stopping client interval');
    });
  });
  server.listen(port);
};
