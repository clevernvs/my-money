"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
exports.default = (mongoUrl) => {
    const url = mongoUrl || process.env.MONGO_URL || 'mongodb://localhost/mymoney';
    return mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};
mongoose_1.default.Error.messages.general.required = "O atributo '{PATH}' é obrigatório.";
mongoose_1.default.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'.";
mongoose_1.default.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'.";
mongoose_1.default.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'.";
