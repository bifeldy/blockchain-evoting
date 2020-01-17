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
    socketClientId: socket.handshake.headers['x-client-id'],
    socketIceServer: [
      { url:'stun:stun01.sipphone.com' },
      { url:'stun:stun.ekiga.net' },
      { url:'stun:stun.fwdnet.net' },
      { url:'stun:stun.ideasip.com' },
      { url:'stun:stun.iptel.org' },
      { url:'stun:stun.rixtelecom.se' },
      { url:'stun:stun.schlund.de' },
      { url:'stun:stun.l.google.com:19302' },
      { url:'stun:stun1.l.google.com:19302' },
      { url:'stun:stun2.l.google.com:19302' },
      { url:'stun:stun3.l.google.com:19302' },
      { url:'stun:stun4.l.google.com:19302' },
      { url:'stun:stunserver.org' },
      { url:'stun:stun.softjoys.com' },
      { url:'stun:stun.voiparound.com' },
      { url:'stun:stun.voipbuster.com' },
      { url:'stun:stun.voipstunt.com' },
      { url:'stun:stun.voxgratia.org' },
      { url:'stun:stun.xten.com' },
      {
        url: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com'
      },
      {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      },
      {
        url: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      }
    ]
  };
  socketClient.push(socketInformation);
  socket.emit('client-id', socketInformation);
  io.emit('add-or-remove-nodes', socketClient);
  console.log(`[SOCKET_CONNECTED] :: ${socket.id}`);
  socket.on('disconnect', () => {
    socketClient = socketClient.filter(p => p.socketId != socket.id);
    io.emit('add-or-remove-nodes', socketClient);
    console.log(`[SOCKET_DISCONNECTED] ${socket.id}`);
    console.log(socketClient);
  })
});