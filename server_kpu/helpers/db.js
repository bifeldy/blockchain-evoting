const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blockchain-evoting'
});

db.connect(error => {
  if (error) console.log(`[MySQL_CONNECTION-${error.code}] ${error.sqlMessage}`);
  else {
    const cfg = db.config;
    console.log('[MySQL_CONNECTION-SUCCESS] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m', cfg.database, `${cfg.user}@${cfg.host}:${cfg.port}`);
  }
});

function mySqlQuery(sqlQuery, sqlInsertData, callback) {
  db.query(sqlQuery, sqlInsertData, (error, results, fields) => {
    if (error) {
      console.log(`[MySQL_QUERY-${error.code}] ${error.sqlMessage}`);
      callback(error);
    }
    else {
      if (sqlInsertData) console.log('[MySQL_QUERY-INSERT/UPDATE] \x1b[95m%s\x1b[0m - \x1b[35m%s\x1b[0m', sqlQuery, JSON.stringify(sqlInsertData));
      else console.log('[MySQL_QUERY-SELECT/DELETE] \x1b[95m%s\x1b[0m', sqlQuery);
      callback(error, results);
    }
  });
}

module.exports = { mySqlQuery };
