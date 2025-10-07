"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const BillingCycle = require("../../db/mongoose/models/BillingCycleModel");
const AuthController = require("../../../interfaces/http/AuthController");
module.exports = function (server) {
    const protectedApi = express_1.default.Router();
    server.use('/api', protectedApi);
    protectedApi.use(auth_1.default);
    BillingCycle.methods(['get', 'post', 'put', 'delete']);
    BillingCycle.updateOptions({ new: true, runValidators: true });
    BillingCycle.after('post', errorHandler_1.default).after('put', errorHandler_1.default);
    BillingCycle.route('count', (req, res) => {
        BillingCycle.count((error, value) => {
            if (error) {
                res.status(500).json({ errors: [error] });
            }
            else {
                res.json({ value });
            }
        });
    });
    BillingCycle.route('summary', (req, res) => {
        BillingCycle.aggregate([
            { $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } } },
            { $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } } },
            { $project: { _id: 0, credit: 1, debt: 1 } }
        ]).exec((error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] });
            }
            else {
                res.json(result[0] || { credit: 0, debt: 0 });
            }
        });
    });
    const openApi = express_1.default.Router();
    server.use('/oapi', openApi);
    openApi.post('/login', AuthController.login);
    openApi.post('/signup', AuthController.signup);
    openApi.post('/validateToken', AuthController.validateToken);
};
