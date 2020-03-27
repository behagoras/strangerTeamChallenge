// libraries import
const express = require('express')
const bodyParser = require('body-parser')
const debug = require('debug')('app:server')
const helmet = require('helmet')

const slash = require('express-slash')

const hashtagsRouter = require('./routes/hashtags')
const authApiRouter = require('./routes/auth')
const config = require('./config')

// require errors
const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers')

// app
const app = express()

// middlewares
app.use(helmet())
app.use(bodyParser.json())
app.enable('strict routing')
app.use(slash())

// routes
app.use('/api/hashtags', hashtagsRouter)
app.use('/api/auth', authApiRouter)

// app.use((err, req, res, next) => {

//   if (err.message.match(/not found/)) {
//     return res.status(404).send({ error: err.message })
//   }

//   res.status(500).send({ error: err.message })
// })

// error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

const server = app.listen(config.port, () => {
  debug(`Server listening http://localhost:${server.address().port}`)
})

module.exports = server
