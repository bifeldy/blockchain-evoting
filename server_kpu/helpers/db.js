const execFile = require('child_process').execFile;
const mysql = require('mysql');

const mySqldPath = "C:/xampp/mysql/bin/mysqld.exe";

var env = null;
try {
  env = require(`${__dirname}/../environments/secretKeyProd.json`);
} catch (error) {
  env = JSON.parse(process.env.secretKeyProduction);
}

var db = null;

function escape(data) {
  return mysql.escape(data);
}

db = mysql.createPool({
  host: env.dbHost,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
});

function handleError(e) {
  console.log(`[MySQL_ERROR-${e.code}]` + ' \x1b[91m%s\x1b[0m', e.sqlMessage);
}

function mySqlQuery(sqlQuery, sqlQueryData, callback) {
  db.getConnection((err, conn) => {
    if (err) handleError(err);
    console.log('[MySQL_CONNECTION-SUCCESS] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m', conn.config.database, `${conn.config.user}@${conn.config.host}:${conn.config.port}`);
    return conn.query(sqlQuery, sqlQueryData, (error, results, fields) => {
      conn.release();
      if (error) {
        handleError(error);
        callback(error);
      }
      else {
        console.log('[MySQL_QUERY] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m', sqlQuery.replace(/\n/g, " ").replace(/ +(?= )/g,'').trim(), JSON.stringify(sqlQueryData));
        callback(error, results, fields);
      }
    });
  });
}

module.exports = { escape, mySqlQuery };
