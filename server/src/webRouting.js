/**
 * Manage express routing for web server.
 */
const compression = require('compression')
const express = require('express')
const path = require('path')
const clientProxyConfig = require('../config/spdzProxy')
const workshopSchedule = require('../config/workshopSchedule')

const environ = process.env.NODE_ENV || 'development'

module.exports = (app) => {
  // REST endpoints come first
  app.get('/voters/spdzProxyConfig', (req, res) => {
    res.json(clientProxyConfig)
  })

  app.get('/voters/talks', (req, res) => {
    res.json(workshopSchedule)
  })

  // Serve GUI from bundled production build files if not in development.
  if (environ !== 'development') {
    app.use(compression())
    // This is middleware, if it can resolve the request from the file system it 
    // will return the file, otherwise call next to move on to routes.   
    app.use('/voters', express.static(__dirname + '/../gui_build'))
    // This is router middleware, and will match all other requests to index.html, which is
    // what we want to support client side routing. 
    app.get('/voters/*', function (req, res) {
      res.sendFile(path.join(__dirname, '/../gui_build', 'index.html'))
    }); 
  }

  app.disable('x-powered-by')
}