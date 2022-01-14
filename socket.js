const cors=require('cors')
const express=require('express')
var app = express();
var server = app.listen(3000,()=>{
  console.log("server started")
});

var io = require('socket.io')(server);

app.use(cors('*'))
io.origins('*:*')

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('my message', (msg) => {
      console.log('message: ' + msg);
    });
  });
