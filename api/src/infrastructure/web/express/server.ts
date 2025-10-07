import express, { Express } from 'express'
import allowCors from './middlewares/cors'
import queryParser from 'express-query-int'

const server: Express = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(allowCors as any)
server.use(queryParser())

export default server


