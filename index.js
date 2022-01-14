const cors=require('cors')
const express=require('express')
var app = express();
 server = app.listen(3000,()=>{
  console.log("server started")
});

app.use(cors('*'))

const dotenv = require('dotenv');
dotenv.config();


const mongoose= require('mongoose')
const bodyParser=require('body-parser')
const {routeUser}=require('./route/UserRoute')
const { notifRoute } = require('./route/NotificationRoute');
const {routeAnnonce}=require('./route/annonceRoute')
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false  } 
)
.then(console.log("connected to mongodb bps"))
.catch(err=> console.log(err))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));
require('./socket/socket');
app.use('/user',routeUser)
app.use('/notification',notifRoute)
app.use('/annonce',routeAnnonce)


