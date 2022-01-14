
tab=[]
async function changeSocketId(userId,socket){
    i=tab.findIndex(x=>x.userId ===  userId)
    console.log(i)
          if(i<0 ){
            tab.push({userId:userId,socketId:socket.id})
  
          }else
           tab[i]={userId:userId,socketId:socket.id}
           return tab
  }

  module.exports.changeSocketId=changeSocketId