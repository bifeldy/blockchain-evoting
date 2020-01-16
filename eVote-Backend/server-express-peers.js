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
const apiVersion = '/api/v1';

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

/** Our NodeJS Library */
const http = require('http');
const path = require('path');

/** Our External Library */
const express = require('express');
const { ExpressPeerServer } = require('peer');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const externalRequest = require('request');
const favicon = require('serve-favicon');

/** Our Application */
const expressApp = express();
const expressServer = http.Server(expressApp);
const expressPeerServer = ExpressPeerServer(expressServer, { proxied: true});

/** Our ExpressJS & PeerJS Server */
let expressAppServer = expressServer.listen(port, host, () => {
  console.log(`Express & Peer Server Running :: ${expressAppServer.address().address}:${expressAppServer.address().port} 🤐`);
}).on('error', err => {
  console.log(`Express & Peer Server '${err.address}' With Port '${err.port}' Already In Use 🤐`);
  expressAppServer = expressServer.listen(0, host, () => {
    console.log(`Alternate Express & Peer Server Running :: ${expressAppServer.address().address}:${expressAppServer.address().port} 🤐`);
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