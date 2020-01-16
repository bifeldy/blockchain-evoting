/** Project Information */
const appName = 'Blockchain E-Voting API 🤭';
const appDescription = 'Delay Itu Bebas, Drop Itu Pilihan! 😉';
const appVersion = 'v1.0 Official Release! 😱';
const appDeveloper = 'Basilius Bias Astho Christyono 😈 000.000.13536';
const appDocumentation = 'https://documenter.getpostman.com/view/5658787/SW7W5pjd';
const appRepository = 'https://github.com/bifeldy/blockchain-evoting';
const appDiscussion = 'https://discord.gg/xGWdExk';

/** Our Server Configuration */
const host = '0.0.0.0';
const port = process.env.PORT || 80;

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

/** Our NodeJS Library */
const http = require('http');
const fs = require('fs');

/** Our External Library */
const socket = require('socket.io');

/** Our Socket Io App */
const socketApp = http.createServer(handler);
const io = socket(socketApp);

function handler (req, res) {
  fs.readFile(__dirname + '/public/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

/** Our Server */
let socketAppServer = socketApp.listen(port, host, () => {
  console.log(`Socket.io Server Running :: ${socketApp.address().address}:${socketApp.address().port} 🤐`);
}).on('error', err => {
  console.log(`Socket.io Server '${err.address}' With Port '${err.port}' Already In Use 🤐`);
  socketAppServer = socketApp.listen(0, host, () => {
    console.log(`Alternate Socket.io Server Running :: ${socketApp.address().address}:${socketApp.address().port} 🤐`);
  });
});

/** Our Socket Io Global Variable */
let socketClient = [];

io.on('connection', socket => {
  const socketInformation = {
    socketId: socket.id,
    socketAddress: socket.handshake.headers['x-forwarded-for'] || socket.handshake.address,
    socketClientId: socket.handshake.headers['x-client-id']
  };
  socketClient.push(socketInformation);
  socket.emit('client-id', JSON.stringify(socketInformation));
  io.emit('add-or-remove-nodes', JSON.stringify(socketClient));
  console.log(`[SOCKET_CONNECTED] :: ${socket.id}`);
  console.log(socketClient);

  socket.on('disconnect', () => {
    socketClient = socketClient.filter(p => p.socketId != socket.id);
    io.emit('add-or-remove-nodes', JSON.stringify(socketClient));
    console.log(`[SOCKET_DISCONNECTED] ${socket.id}`);
    console.log(socketClient);
  })
});