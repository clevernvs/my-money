import express from 'express'
import auth from './middlewares/auth'
import errorHandler from './middlewares/errorHandler'
import BillingCycle = require('../../db/mongoose/models/BillingCycleModel')
import AuthController = require('../../../interfaces/http/AuthController')

export = function (server: any) {
    const protectedApi = express.Router()
    server.use('/api/v2', protectedApi)
    protectedApi.use(auth as any)

    BillingCycle.methods(['get', 'post', 'put', 'delete'])
    BillingCycle.updateOptions({ new: true, runValidators: true })
    BillingCycle.after('post', errorHandler as any).after('put', errorHandler as any)

    BillingCycle.route('count', (req: any, res: any) => {
        BillingCycle.count((error: any, value: any) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json({ value })
            }
        })
    })

    BillingCycle.route('summary', (req: any, res: any) => {
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

    const openApi = express.Router()
    server.use('/api/v2', openApi)

    openApi.post('/login', AuthController.login)
    openApi.post('/signup', AuthController.signup)
    openApi.post('/validateToken', AuthController.validateToken)
}


