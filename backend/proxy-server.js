// proxy-server.js
const corsAnywhere = require('cors-anywhere')
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

corsAnywhere
  .createServer({
    originWhitelist: ['https://zyxce.github.io'],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
  })
  .listen(port, host, () => {
    console.log(`CORS Anywhere proxy running on ${host}:${port}`)
  })
