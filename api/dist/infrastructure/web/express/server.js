"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const port = Number(process.env.PORT) || 3003;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
const cors_1 = __importDefault(require("./middlewares/cors"));
const express_query_int_1 = __importDefault(require("express-query-int"));
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(body_parser_1.default.json());
server.use(cors_1.default);
server.use((0, express_query_int_1.default)());
server.listen(port, function () {
    console.log(`BACKEND is running on port ${port}...`);
});
module.exports = server;
