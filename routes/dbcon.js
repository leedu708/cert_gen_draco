var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysqldb.ctktrxaj5nit.us-west-2.rds.amazonaws.com',
  user            : 'cs467',
  password        : 'August2017',
  database        : 'cs_467'
});

module.exports.pool = pool;
