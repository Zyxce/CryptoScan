// proxy-server.js
const cors_proxy = require('cors-anywhere')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

cors_proxy
  .createServer({
    originWhitelist: ['https://zyxce.github.io'],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
  })
  .listen(port, host, () => {
    console.log(`CORS Proxy running on ${host}:${port}`)
  })
