const mysql = require("mysql2");

const createConnection = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "St@r1234",
    database: "new_quiz",
  });
};

module.exports.createConnection = createConnection;
