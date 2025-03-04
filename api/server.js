// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')

const server = jsonServer.create()

// Uncomment to allow write operations
const fs = require('fs')
const path = require('path')
const filePath = path.join('db.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)

const middlewares = jsonServer.defaults({ noCors: true })

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}))

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.header('Access-Control-Allow-Origin', 'https://front-portal-wagner-mobile-costas-projects.vercel.app/')
  res.header('Access-Control-Allow-Headers', '*')  
  next();
})

server.use(router)
server.listen(3000, () => {
    console.log('Api Json')
})

// Export the Server API
module.exports = server
