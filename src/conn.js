import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'lemoonchild',
  database: 'blog_db',
  password: '1234',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
