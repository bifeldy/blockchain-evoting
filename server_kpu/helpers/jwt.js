const jwt = require('jsonwebtoken');

const jwtAlgorithm = 'HS512';
const jwtIssuer = "Bifeldy-2020";
const jwtAudience = "BlockchainNetwork-2020";
const jwtSecretKey = "eVoting-2020";
const jwtExpiredIn = 60*60; // Default only 1 hours

function JwtEncode(user, rememberMe = false) {
  return jwt.sign({ user }, jwtSecretKey, {
    algorithm: jwtAlgorithm,
    issuer: jwtIssuer,
    audience: jwtAudience,
    // login up to 1 days
    expiresIn: rememberMe == true ? (24*60*60) : jwtExpiredIn,
  });
}

function JwtDecode(req, res, next) {
  try {
    let token = req.headers['authorization'] || req.headers['x-access-token'] || req.body.token || '';
    if(token.startsWith('Bearer ')) token = token.slice(7, token.length);
    const decoded = jwt.verify(token, jwtSecretKey);
    return decoded;
  }
  catch (err) {
    res.status(401).json({
      info: '🤧 401 - Whoops, Akses Ditolak! 😷',
      result: err
    });
    return null;
  }
}

module.exports = {
  JwtEncode, JwtDecode
};
