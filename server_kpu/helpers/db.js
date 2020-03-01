const execFile = require('child_process').execFile;
const mysql = require('mysql');

const mySqldPath = "C:/xampp/mysql/bin/mysqld.exe";

var db = null;

// const mySqld = execFile(mySqldPath, [
//   // No Arguments
// ], (err, stdout, stderr) => {
//   if (err) throw err;
//   if(stdout) console.log('[MYSQLD-STDOUT] \x1b[95m%s\x1b[0m', stdout.toString());
//   if(stderr) console.log('[MYSQLD-STDERR] \x1b[91m%s\x1b[0m', stderr.toString());
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blockchain-evoting'
  });
  db.connect(error => {
    if (error) console.log(`[MySQL_CONNECTION-${error.code}]` + ' \x1b[91m%s\x1b[0m', error.sqlMessage);
    else {
      const cfg = db.config;
      console.log('[MySQL_CONNECTION-SUCCESS] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m', cfg.database, `${cfg.user}@${cfg.host}:${cfg.port}`);
    }
  });
  db.on('error', (error) => {
    console.log(`[MySQL_ERROR-${error.code}]` + ' \x1b[91m%s\x1b[0m', error.sqlMessage);
  });
// });

function escape(data) {
  return mysql.escape(data);
}

function mySqlQuery(sqlQuery, sqlQueryData, callback) {
  db.query(sqlQuery, sqlQueryData, (error, results, fields) => {
    if (error) {
      console.log(`[MySQL_ERROR-${error.code}]` + ' \x1b[91m%s\x1b[0m', error.sqlMessage);
      callback(error);
    }
    else {
      console.log('[MySQL_QUERY] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m', sqlQuery.replace(/\n/g, " ").replace(/ +(?= )/g,'').trim(), JSON.stringify(sqlQueryData));
      callback(error, results, fields);
    }
  });
}

module.exports = { escape, mySqlQuery };
