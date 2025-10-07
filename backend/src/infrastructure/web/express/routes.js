const express = require('express')
const auth = require('./middlewares/auth')

module.exports = function (server) {
    // Rotas protegidas
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    protectedApi.use(auth)

    // BillingCycle (node-restful)
    const BillingCycle = require('../../db/mongoose/models/BillingCycleModel')
    const errorHandler = require('./middlewares/errorHandler')
    BillingCycle.methods(['get', 'post', 'put', 'delete'])
    BillingCycle.updateOptions({ new: true, runValidators: true })
    BillingCycle.after('post', errorHandler).after('put', errorHandler)

    BillingCycle.route('count', (req, res) => {
        BillingCycle.count((error, value) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json({ value })
            }
        })
    })

    BillingCycle.route('summary', (req, res) => {
        BillingCycle.aggregate([
            { $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } } },
            { $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } } },
            { $project: { _id: 0, credit: 1, debt: 1 } }
        ]).exec((error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json(result[0] || { credit: 0, debt: 0 })
            }
        })
    })

    // Rotas abertas
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthController = require('../../../interfaces/http/AuthController')
    openApi.post('/login', AuthController.login)
    openApi.post('/signup', AuthController.signup)
    openApi.post('/validateToken', AuthController.validateToken)
}


