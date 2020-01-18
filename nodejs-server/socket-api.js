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
const port = process.env.PORT || 81;
const apiVersion = '/api/v1/';

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

/** Our NodeJS Library */
const http = require('http');
const path = require('path');

/** Our External Library */
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const externalRequest = require('request');
const favicon = require('serve-favicon');

/** Our Application */
const app = express();
const server = http.createServer(app);
const io = socket(server);

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

/** Our JWT Global Variables Data */
const jwtAlgorithm = 'HS512';
const jwtIssuer = "Basilius Bias Astho Christyono";
const jwtAudience = "Blockchain Network!";
const jwtSecretKey = "Bifeldy";
const jwtExpiredIn = 24*60*60;
const jwtNotBefore = new Date().getTime();

/** JavaScript Web Token Helper */
function JwtEncode(user, remember_me = false) {
  return jwt.sign({user}, jwtSecretKey, {
    algorithm: jwtAlgorithm,
    issuer: jwtIssuer,
    audience: jwtAudience,
    expiresIn: remember_me == true ? '30d' : jwtExpiredIn
  });
}

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

app.use(favicon(path.join(`${__dirname}/public/`, 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(cors());

// TODO: EXPRESS API ROUTING

/** Home API Page */
app.get(`${apiVersion}`, (request, response) => {
  console.log(`${request.connection.remoteAddress}:${request.connection.remotePort} => /`);
  // response.sendfile('./Information.png');
  // response.redirect(appDocumentation);
  response.json({
    appName, appDescription, appVersion, appDeveloper, appDocumentation, appRepository, appDiscussion
  });
});

/** Error 404 - Harus Paling Bawah */
app.get('*', (request, response) => {
  console.log(`${request.connection.remoteAddress}:${request.connection.remotePort} => /**`);
  response.status(404).json({
      info: 'Whoops Terjadi Kesalahan! 😫',
      message: 'Error 404 - API Not Found! 💩',
      appName, appDescription, appVersion, appDeveloper, appDocumentation, appRepository, appDiscussion
  });
});

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

/** Our Socket Io Global Variable */
const IceServer = [
  { urls: 'stun:bifeldy.ip-dynamic.net:3478' },
  { urls: 'stun:stun.ipshka.com' },
  { urls: 'stun:stun01.sipphone.com' },
  { urls: 'stun:stun.ekiga.net' },
  { urls: 'stun:stun.fwdnet.net' },
  { urls: 'stun:stun.ideasip.com' },
  { urls: 'stun:stun.iptel.org' },
  { urls: 'stun:stun.rixtelecom.se' },
  { urls: 'stun:stun.schlund.de' },
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
  { urls: 'stun:stunserver.org' },
  { urls: 'stun:stun.softjoys.com' },
  { urls: 'stun:stun.voiparound.com' },
  { urls: 'stun:stun.voipbuster.com' },
  { urls: 'stun:stun.voipstunt.com' },
  { urls: 'stun:stun.voxgratia.org' },
  { urls: 'stun:stun.xten.com' }
];

let socketClient = [];

io.on('connection', socket => {
  const socketInformation = {
    socketId: socket.id,
    socketAddress: socket.handshake.headers['x-forwarded-for'] || socket.handshake.address,
    socketClientId: socket.handshake.query.client_id,
    socketIceServer: IceServer
  };
  socketClient.push(socketInformation);
  socket.emit('client-id', socketInformation);
  io.emit('add-or-remove-nodes', socketClient);
  console.log(`[SOCKET_CONNECTED] :: ${socket.id}`);
  console.log(`[TOTAL_CLIENT] :: ${socketClient.length} Sockets`);
  socket.on('disconnect', () => {
    socketClient = socketClient.filter(p => p.socketId != socket.id);
    io.emit('add-or-remove-nodes', socketClient);
    console.log(`[SOCKET_DISCONNECTED] ${socket.id}`);
    console.log(`[TOTAL_CLIENT] :: ${socketClient.length} Sockets`);
  })
});

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

let listener = server.listen(port, host, () => {
  console.log(`Socket.io Server Running :: ${listener.address().address}:${listener.address().port} 🤐`);
}).on('error', err => {
  console.log(`Socket.io Server '${err.address}' With Port '${err.port}' Already In Use 🤐`);
  listener = server.listen(0, host, () => {
    console.log(`Alternate Socket.io Server Running :: ${listener.address().address}:${listener.address().port} 🤐`);
  });
});
