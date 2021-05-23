const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "elihu100",
    database: "employees"
});

pool.query = util.promisify(pool.query);

module.exports = pool;