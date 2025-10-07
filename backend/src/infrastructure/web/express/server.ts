const port: number = Number(process.env.PORT) || 3003

import bodyParser from 'body-parser'
import express from 'express'
const server = express()
import allowCors from './middlewares/cors'
import queryParser from 'express-query-int'

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors as any)
server.use(queryParser())

server.listen(port, function () {
    console.log(`BACKEND is running on port ${port}...`)
})

export = server


