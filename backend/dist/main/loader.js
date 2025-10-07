"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server = require("../infrastructure/web/express/server");
const routes = require("../infrastructure/web/express/routes");
const mongooseConnection_1 = __importDefault(require("../infrastructure/db/mongoose/connection/mongooseConnection"));
(0, mongooseConnection_1.default)().then(() => {
    routes(server);
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
