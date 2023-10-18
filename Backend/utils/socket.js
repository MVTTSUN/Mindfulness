const { Server } = require('socket.io');

const io = new Server();

const Socket = {
  emit: (event, data) => {
    io.sockets.emit(event, data);
  },
};

exports.Socket = Socket;
exports.io = io;
