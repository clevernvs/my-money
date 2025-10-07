import express, { Router } from 'express'
import auth from './middlewares/auth'
import errorHandler from './middlewares/errorHandler'
import BillingCycle = require('../../db/mongoose/models/BillingCycleModel')
import AuthController = require('../../../interfaces/http/AuthController')
import * as BillingCycleController from '../../../interfaces/http/BillingCycleController'

export = function (server: express.Express) {
    const protectedApi: Router = express.Router()
    server.use('/api/v2', protectedApi)
    protectedApi.use(auth as any)

    BillingCycle.methods(['get', 'post', 'put', 'delete'])
    BillingCycle.updateOptions({ new: true, runValidators: true })
    BillingCycle.after('post', errorHandler as any).after('put', errorHandler as any)

    // DDD use case example route (create)
    protectedApi.post('/billingCycles/create', BillingCycleController.create)

    BillingCycle.route('count', (_req: any, res: any) => {
        BillingCycle.count((error: any, value: any) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json({ value })
            }
        })
    })

    BillingCycle.route('summary', (_req: any, res: any) => {
        BillingCycle.aggregate([
            { $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } } },
            { $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } } },
            { $project: { _id: 0, credit: 1, debt: 1 } }
        ]).exec((error: any, result: any[]) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json(result[0] || { credit: 0, debt: 0 })
            }
        })
    })

    const openApi: Router = express.Router()
    server.use('/api/v2', openApi)

    openApi.post('/login', AuthController.login)
    openApi.post('/signup', AuthController.signup)
    openApi.post('/validateToken', AuthController.validateToken)
}


