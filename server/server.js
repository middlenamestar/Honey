const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const routes = require('./routes');
const db = require('./config/connection');

// for chat function
const http = require("http");
const cors = require("cors")
const {Server} = require("socket.io")
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
});

// run when client connects
io.on('connection', (socket) => {
  //console.log(`User Connected: ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })
 
  socket.on('disconnect', () => {
    io.emit('User Disconnected', socket.id)
  })
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// If this is production allow static files to be served from the build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// app.listen(PORT, ()=>{
//     console.log("App is listening on: http://localhost:" + PORT)
// })

// 404
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })

db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});