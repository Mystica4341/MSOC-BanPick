
/**
 * Registers socket event handlers for the connection
 * @param {import('socket.io').Socket} socket - The socket instance for the connection
 * @returns {void}
 */
export function registerController(socket, room) {
  socket.join(room);

  socket.emit('controller:connect', socket.id);
  socket.on('disconnect', () => {
    console.debug('Controller disconnected: ' + socket.id);
    socket.to(room).emit('controller:disconnect', socket.id);
  });

  socket.onAny((event, ...args) => {
    console.debug('Controller send event:', event, args);
    socket.broadcast.to(room).emit(event, ...args);
  });

  socket.onAnyOutgoing((event, ...args) => {
    console.debug('Controller receive event:', event, args);
    // do something? dunno yet
  });
}

/**
 * Registers socket event handlers for the connection
 * @param {import('socket.io').Socket} socket - The socket instance for the connection
 * @returns {void}
 */
export function registerDisplay(socket, room) {
  socket.join(room);

  socket.broadcast.to(room).emit('display:connect', socket.id);
  socket.on('disconnect', () => {
    console.debug('Display disconnected: ' + socket.id);
    socket.to(room).emit('display:disconnect', socket.id);
  })

  socket.onAny((event, ...args) => {
    console.debug('Display send event:', event, args);
    socket.broadcast.to(room).emit(event, ...args);
  });

  socket.onAnyOutgoing((event, ...args) => {
    console.debug('Display receive event:', event, args);
    // do something? dunno yet
  });
}