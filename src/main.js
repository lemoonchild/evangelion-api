import express from 'express'
import { createPost, getAllPosts, getById, deletebyID, updatePostById } from './db.js'
import { logRequests } from './errors.js'
import cors from 'cors'

const app = express()
app.use(express.json())
const port = 5000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello from Evangelion API!')
})

app.get('/posts', async (req, res) => {
  const posts = await getAllPosts()
  res.json(posts)
})

app.post('/posts', logRequests, async (req, res) => {
  try {
    console.log(req.body)
    const { title, content, author, category, tags } = req.body

    console.log(title, content, author, category, tags)

    const message = 'Post created successfully! :)'
    const result = await createPost(title, content, author, category, tags)

    res.status(200).json({ message, result })
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

app.get('/posts/:postId', logRequests, async (req, res) => {
  try {
    console.log(req.params.postId)
    const posts = await getById(req.params.postId)
    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

app.delete('/posts/:postId', logRequests, async (req, res) => {
  try {
    console.log(req.params.postId)
    const result = await deletebyID(req.params.postId)
    const message = 'Post deleted successfully! :)'
    res.status(200).json({ message, result })
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

app.put('/posts/:postId', logRequests, async (req, res) => {
  try {
    const { title, content, author, category, tags } = req.body
    const { postId } = req.params

    const result = await updatePostById(title, content, author, category, tags, postId)

    if (result.affectedRows === 0) {
      const message = 'Post not found :('
      return res.status(404).json({ message })
    }
    const message = 'Post updated successfully! :)'
    res.status(200).json({ message, result })
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

app.use((req, res) => {
  res.status(400).send('404: The requested endpoint does not exist.')
})

app.use((req, res, next) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE']
  if (!methods.includes(req.method)) {
    return res.status(501).send('501: The request method is not supported by the server.')
  }
  next()
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
