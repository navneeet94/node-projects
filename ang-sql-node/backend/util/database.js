const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database:'angsql',
    password: '1234567890'
})
module.exports = pool.promise();