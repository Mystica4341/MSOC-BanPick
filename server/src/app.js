const express = require('express');
const app = express();
const http = require('http')
const { Server } = require('socket.io');
const cors = require('cors');
const { randomUUID } = require('crypto');


const { registerController, registerDisplay } = require('./route/register');


app.use(cors());

const server = http.createServer(app);

const socketServer = new Server(server, {
  cors: {
    origin: '*',
  }
});

socketServer.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.once("who", (role) => {
    try {
      switch (role) {
        case "controller":
          handleControllerRegistration(socket);
          break;
        case "display":
          handleDisplayRegistration(socket);
          break;
        default:
          socket.emit("error", "Bro, who are you? gtfo");
          console.error("Invalid role:", role);
          socket.disconnect(true);
      }
    } catch (error) {
      console.error(error);
      socket.emit("error", "Registration failed");
    }
  });
});

function handleControllerRegistration(socket) {
  socket.once("room", (room) => {
    if (!room || typeof room !== 'string') {
      room = randomUUID().toString();
      console.debug('Make room: ' + room + ' for controller ' + socket.id);
      socket.emit('server:room', room);
    } else {
      console.debug('Controller ' + socket.id + ' in room ' + room);
    }
    registerController(socket, room);
  });
}

function handleDisplayRegistration(socket) {
  socket.once("room", (room) => {
    if (!room || typeof room !== 'string') {
      socket.emit("error", "Invalid room format");
      console.log("Invalid room format:", room);
      return;
    }
    registerDisplay(socket, room);
  });
}

server.listen(3001, () => {
  console.log('listening on *:3001');
});
