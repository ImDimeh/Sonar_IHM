const express = require('express');
const cors = require('cors');
const app = express();
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const http = require('http');
const httpServer = http.createServer(app);
const path = require('path');
let ip = require('ip');
const buffers = require('buffer');
const { Socket } = require('dgram');
console.log(ip.address())
let i = 0
let color = [0, 0, 0]
const PORT = 3000;
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
})

/*const io = new Server(httpServer, {
    cors : {
        origin : '*'
    }
});*/

// middelware
app.use(express.json());  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
//consolelog type request and url middle ware
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})
app.get('/', (req, res) => {
  res.json('ip address: http://' + ip.address() + ':' + PORT);
});


app.get("/", (req, res) => {
  console.log("grt")
  res.send({ "msg": "ok get" })
})
// routes
app.post('/pos', (req, res) => {
  const pos = req.body
  console.log("pos")
  console.log(pos.position )
  io.emit("Sendpos", pos)
  // RECREER un chart
  
  //io.em it("Sendpos", pos)
  res.send({ "msg": pos })
  
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('user connected');
  socket.on('disconnect', () => {
    // console.log('user disconnected');
    socket.broadcast.emit('user disconnected');
  });


  socket.on('message', (msg) => {
    // console.log('message: ' + msg);
    io.emit('message', msg);
  });
 
});





httpServer.listen(PORT, () => {
  console.log('Server ip : http://' + ip.address() + ":" + PORT);
})