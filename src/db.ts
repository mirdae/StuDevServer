import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: 'studev'
});

connection.connect(() => console.log('DB is connected....'));
