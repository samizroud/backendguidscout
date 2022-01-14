require('../index');
var { changeSocketId } = require("./workSocket")
tab = []
const io = require('socket.io')(server);
io.origins('*:*')

io.on('connection', function (socket) {

  console.log(socket.id)

  socket.on('connectedUser', (obj) => {
    console.log("objectttt",obj)
    changeSocketId(obj, socket).then(users => {
      tab = users
    })
    console.log("tab",tab)
    //socket.broadcast.to(tab[0].socketId).emit('connectedUsers', tab);


  });

  tabU = []
  socket.on("new notification", (notif, dest) => {

 

    dest.forEach(e => {
      let tabDest = []
      tabDest.push(e._id)

      tab.forEach(x => {

        if (tabDest.includes(x.userId)) {
          socket.broadcast.to(x.socketId).emit('notification', notif);
        }

      })
    })

  });
  // socket.on('userId', (userId) => {
  //   t = changeSocketId(userId, socket)
  //   console.log(t)


  // });


  socket.on('send', (message) => {
    //const receiverId = sessionsMap[message.receiverId];
    tab = changeSocketId(message.send, socket)
    i = tab.findIndex(x => x.userId == message.to)
    console.log(tab[i])
    socket.broadcast.to(tab[i].socketId).emit('my message', message);
  });


 socket.on('end', (iduser)=>{
    console.log("disconnect")
    //socket.disconnect();
    let i=tab.indexOf(iduser)
    tab.splice(i,1)
    console.log(tab)
  });
});
