const express = require('express')
const server = express()
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 8080

// Routes
const api = require('./api/api-server.js')

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(morgan('tiny'))
server.use(cors())

// GET root path
server.use('/', api)

// catch 404 and forward to error handler
server.use(function(req, res, next) {
	res.status(404)
	const error = new Error('Not Found')
	next(error)
});

// error handler
server.use(function(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
	  message: error.message
  })
});

// Deploy server
server.listen(port, () => {
	console.log('Server running on port:', port)
})

