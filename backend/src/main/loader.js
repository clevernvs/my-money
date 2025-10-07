require('dotenv').config && require('dotenv').config()

const server = require('../infrastructure/web/express/server')
const routes = require('../infrastructure/web/express/routes')
const connect = require('../infrastructure/db/mongoose/connection/mongooseConnection')

connect().then(() => {
    routes(server)
}).catch(err => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
})


