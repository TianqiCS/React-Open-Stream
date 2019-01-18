let express = require('express');
let app = express();

let server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

let socket = require('socket.io');
let io = socket(server);


const roomNum = {};

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on("JOIN", r =>{
        socket.join(r);
        roomNum[socket.id] = r;
        console.log("room",r);
    });
    socket.on("SEND_MESSAGE", data =>{
        console.log(data);
        io.to(roomNum[socket.id]).emit("RECEIVE_MESSAGE",data);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

