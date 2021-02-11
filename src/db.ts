import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '5872',
  database: 'studev',
  connectionLimit: 50000,
  waitForConnections: false,
});

const get = async () => {
  const connection = await pool.getConnection();
  const query =
    "insert into user(id, user_id, password, nickname) values(1, 'dd', '123', 'dd')";

  connection.query(query);
};

get();
