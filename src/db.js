import conn from './conn.js'

async function getAllPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

async function createPost(title, content, author, category, tags) {
  const [result] = await conn.query(
    'INSERT INTO blog_posts (title, content, author, category, tags) VALUES (?, ?, ?, ?, ?)',
    [title, author, category, content, tags],
  )
  return result
}

async function getById(postId) {
  const [result] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId])
  return result
}

async function deletebyID(postId) {
  const [deleteResult] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [postId])
  return deleteResult
}

async function updatePostById(title, content, author, category, tags, postId) {
  const [result] = await conn.query(
    'UPDATE blog_posts SET title = ?, content = ?, author = ?, category = ?, tags = ? WHERE id = ?',
    [title, content, author, category, tags, postId],
  )
  return result
}

export { createPost, getAllPosts, getById, deletebyID, updatePostById }
