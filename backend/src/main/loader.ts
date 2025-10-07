import 'dotenv/config'

import server = require('../infrastructure/web/express/server')
import routes = require('../infrastructure/web/express/routes')
import connect from '../infrastructure/db/mongoose/connection/mongooseConnection'

connect().then(() => {
    routes(server)
}).catch(err => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
})


