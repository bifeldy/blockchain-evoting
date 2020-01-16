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
const portSocketIo = process.env.PORT || 80;
const portExpressPeer = process.env.PORT || 81;
const apiVersion = '/api/v1';

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

/** Our NodeJS Library */
const http = require('http');
const path = require('path');
const fs = require('fs');

/** Our External Library */
const express = require('express');
const socket = require('socket.io');
const { ExpressPeerServer } = require('peer');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const externalRequest = require('request');
const favicon = require('serve-favicon');

/** Our Application */
const expressApp = express();
const expressServer = http.Server(expressApp);
const expressPeerServer = ExpressPeerServer(expressServer, { proxied: true });
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

/** Our ExpressJS & PeerJS Server */
let expressAppServer = expressServer.listen(portExpressPeer, host, () => {
  console.log(`Express & Peer Server Running :: ${expressAppServer.address().address}:${expressAppServer.address().port} 🤐`);
}).on('error', err => {
  console.log(`Express & Peer Server '${err.address}' With Port '${err.port}' Already In Use 🤐`);
  expressAppServer = expressServer.listen(0, host, () => {
    console.log(`Alternate Express & Peer Server Running :: ${expressAppServer.address().address}:${expressAppServer.address().port} 🤐`);
  });
});

/** Our Sockeet.io Server */
let socketAppServer = socketApp.listen(portSocketIo, host, () => {
  console.log(`Socket.io Server Running :: ${socketApp.address().address}:${socketApp.address().port} 🤐`);
}).on('error', err => {
  console.log(`Socket.io Server '${err.address}' With Port '${err.port}' Already In Use 🤐`);
  socketAppServer = socketApp.listen(0, host, () => {
    console.log(`Alternate Socket.io Server Running :: ${socketApp.address().address}:${socketApp.address().port} 🤐`);
  });
});

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

/** Our Express App Server */
expressApp.set('trust proxy', 1);
expressApp.use(favicon(path.join(`${__dirname}/public/`, 'favicon.ico')));
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
expressApp.use(cors());
expressApp.use('/peers', expressPeerServer);

/** Default Response Data NotFound */
function ResponseJsonDataNotFound(response, info, message) {
  return response.status(404).json({info, message});
}

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

/** Home API Page */
expressApp.get(`${apiVersion}`, (request, response) => {
  console.log(`${request.connection.remoteAddress}:${request.connection.remotePort} => /`);
  // response.sendfile('./Information.png');
  // response.redirect(appDocumentation);
  response.json({
    appName, appDescription, appVersion, appDeveloper, appDocumentation, appRepository, appDiscussion
  });
});

/** Login User */
expressApp.get(`${apiVersion}/login`, (request, response) => {
  console.log(`${request.connection.remoteAddress}:${request.connection.remotePort} => /login`);
  // io.to(peers[1].id).emit('welcome-info', "Dari Luar");
  response.json({});
});

/** Register User */
expressApp.get(`${apiVersion}/register`, (request, response) => {
  console.log(`${request.connection.remoteAddress}:${request.connection.remotePort} => /register`);
  response.json({});
});

/** Error 404 - Harus Paling Bawah */
expressApp.get('*', (request, response) => {
  console.log(`${request.connection.remoteAddress}:${request.connection.remotePort} => /notFound`);
  response.status(404).json({
      info: 'Whoops Terjadi Kesalahan! 😫',
      message: 'Error 404 - API Not Found! 💩',
      appDocumentation, appRepository, appDiscussion
  });
});

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

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
  });
});
