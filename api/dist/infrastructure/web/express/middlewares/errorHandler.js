"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.default = (req, res, next) => {
    const bundle = res.locals.bundle;
    if (bundle && bundle.errors) {
        const errors = [];
        lodash_1.default.forIn(bundle.errors, (error) => errors.push(error.message));
        return res.status(500).json({ errors });
    }
    next();
};
