// node server which will handle socket io connections
const io = require("socket.io")(8000);
const users = {};

 io.on('connection', socket=>{
     socket.on('new-user-joined', name=>{ // Listens for the 'new-user-joined' event from the client
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name); // Sends a 'user-joined' event to all connected clients except the sender
     });

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });

     socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
 })
