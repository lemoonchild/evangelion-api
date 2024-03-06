import fs from 'fs'
import path from 'path'

function logRequests(req, res, next) {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${
    req.path
  } - Payload: ${JSON.stringify(req.body)}\n`
  fs.appendFile(path.join(__dirname, 'log.txt'), logMessage, (err) => {
    if (err) console.error('Error logging request:', err)
  })
  next()
}

export { logRequests }
