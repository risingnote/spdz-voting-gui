/**
 * Manage express routing for web server.
 */
const environ = process.env.NODE_ENV || 'development'

module.exports = (app) => {
  // REST endpoints come first
  app.get('/spdzProxyConfig', (req, res) => {
    res.json(proxyConfig)
  })

  app.get('/api/talks', (req, res) => {
    res.json(workshopSchedule)
  })

  // Serve GUI from bundled production build files if not in development.
  // Note catch all to support html 5 history API
  if (environ !== 'development') {
    app.use(compression())  
    app.use(express.static(__dirname + '/../../client/build'))
    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '/../../client/build', 'index.html'))
    }); 
  }

  app.disable('x-powered-by')
}