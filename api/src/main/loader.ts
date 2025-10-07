import 'dotenv/config'

import server from '../infrastructure/web/express/server'
import routes from '../infrastructure/web/express/routes'
import connect from '../infrastructure/db/mongoose/connection/mongooseConnection'

const port: number = Number(process.env.PORT) || 3003

connect()
    .then(() => {
        routes(server)
        server.listen(port, () => {
            console.log(`BACKEND is running on port ${port}...`)
        })
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err)
        process.exit(1)
    })


