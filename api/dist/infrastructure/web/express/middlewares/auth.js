"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['authorization'];
    if (!token)
        return res.status(403).send({ errors: ['No token provided.'] });
    const tokenStr = Array.isArray(token) ? token[0] : token;
    const cleaned = tokenStr.startsWith('Bearer ')
        ? tokenStr.substring(7)
        : tokenStr;
    jsonwebtoken_1.default.verify(cleaned, process.env.AUTH_SECRET || 'my-secret', function (err, decoded) {
        if (err)
            return res.status(403).send({ errors: ['Failed to authenticate token.'] });
        req.decoded = decoded;
        next();
    });
};
