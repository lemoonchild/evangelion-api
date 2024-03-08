import express from 'express'
import fs from 'fs'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import cors from 'cors'
import { createPost, getAllPosts, getById, deletebyID, updatePostById } from './db.js'

const app = express()
const port = 5000
const swaggerDocument = YAML.load('./api-docs/swagger.yaml')

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req, res, next) => {
  const oldSend = res.send
  res.send = function datalog(data) {
    const logEntry = `Hora: ${new Date().toISOString()}, Endpoint: ${req.path}, Método: ${
      req.method
    }, Payload: ${JSON.stringify(req.body)}, Respuesta: ${data}\n`
    fs.appendFile('log.txt', logEntry, (err) => {
      if (err) console.log(err)
    })
    res.send = oldSend
    return res.send(data)
  }
  next()
})

app.get('/', (req, res) => {
  res.send('Hello from Evangelion API!')
})

app.get('/posts', async (req, res) => {
  const posts = await getAllPosts()
  res.json(posts)
})

app.post('/posts', async (req, res) => {
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

app.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params.postId
    const posts = await getById(postId)

    if (posts.length === 0) {
      res.status(404).send('404: post not found :(')
    }

    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

app.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const result = await deletebyID(postId)

    if (result.affectedRows === 0) {
      res.status(404).send('404: Post not found :(')
    }

    const message = 'Post deleted successfully! :)'
    res.status(200).json({ message })
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

app.put('/posts/:postId', async (req, res) => {
  try {
    const { title, content, author, category, tags } = req.body
    const { postId } = req.params

    const result = await updatePostById(title, content, author, category, tags, postId)

    if (result.affectedRows === 0) {
      const message = 'Post not found :('
      res.status(404).json({ message })
    }

    const message = 'Post updated successfully! :)'
    res.status(200).json({ message, result })
  } catch (error) {
    console.error(error)

    res.status(500).send(error.message)
  }
})

app.use((req, res, next) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE']
  if (!methods.includes(req.method)) {
    res.status(501).send('501: The request method is not supported by the server.')
  }
  next()
})

app.use((req, res) => {
  res.status(400).send('400: The requested endpoint does not exist.')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
