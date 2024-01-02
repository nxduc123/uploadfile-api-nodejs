var mysql = require("mysql");
const logger = require("../winston/winston-daily");

var connection = mysql.createConnection({
  host: process.env.HOSTDB,
  user: process.env.USER,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_NAME,
});
connection.connect(function (err) {
  if (err) throw err;
  logger.logger.info("Database is connected successfully !");
});
module.exports = {
  connection,
};
