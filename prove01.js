const http = require('http')
const prove01Routes = require('./prove01-routes')

const server = http.createServer(prove01Routes)
server.listen(3000)