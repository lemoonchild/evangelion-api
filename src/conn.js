import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'nahomy',
  database: 'blog_nahomy',
  password: 'nahomy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
