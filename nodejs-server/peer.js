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
const port = process.env.PORT || 82;
const apiVersion = '/api/v1/';

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
const app = express();
const server = http.createServer(app);
const peer = ExpressPeerServer(server, { proxied: true });

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

app.use(favicon(path.join(`${__dirname}/public/`, 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/peer', peer);
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(cors());

/********** ********** ********** ********** ********** ********** ********** ********** ********** **********/

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

/** Our PeerJS Server */
let listener = server.listen(port, host, () => {
  console.log(`Peer Server Running :: ${listener.address().address}:${listener.address().port} 🤐`);
}).on('error', err => {
  console.log(`Peer Server '${err.address}' With Port '${err.port}' Already In Use 🤐`);
  listener = server.listen(0, host, () => {
    console.log(`Alternate Peer Server Running :: ${listener.address().address}:${listener.address().port} 🤐`);
  });
});