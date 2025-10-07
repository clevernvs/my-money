"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const _ = __importStar(require("lodash"));
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
// Tipagem flexível para compatibilidade com node-restful
const User = require('../../infrastructure/db/mongoose/models/UserModel');
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = [];
    _.forIn(dbErrors.errors, (error) => errors.push(error.message));
    return res.status(400).json({ errors });
};
const signMinimal = (user) => {
    const payload = { _id: user._id, name: user.name, email: user.email };
    const secret = process.env.AUTH_SECRET || 'my-secret';
    return jwt.sign(payload, secret, { expiresIn: '1 day' });
};
const login = (req, res) => {
    const { email = '', password = '' } = (req.body || {});
    User.findOne({ email }, (err, user) => {
        if (err)
            return sendErrorsFromDB(res, err);
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = signMinimal(user);
            const { name, email } = user;
            return res.json({ name, email, token });
        }
        return res.status(400).send({ errors: ['Usuário ou Senha está inválido.'] });
    });
};
const validateToken = (req, res) => {
    const { token = '' } = (req.body || {});
    jwt.verify(token, process.env.AUTH_SECRET || 'my-secret', function (err) {
        return res.status(200).send({ valid: !err });
    });
};
const signup = (req, res) => {
    const { name = '', email = '', password = '', confirm_password = '' } = (req.body || {});
    const confirmPassword = confirm_password;
    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informa está inválido'] });
    }
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6 - 20.'
            ]
        });
    }
    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] });
    }
    User.findOne({ email }, (err, user) => {
        if (err)
            return sendErrorsFromDB(res, err);
        if (user)
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] });
        User.create({ name, email, password: passwordHash }, (err) => {
            if (err)
                return sendErrorsFromDB(res, err);
            return login(req, res);
        });
    });
};
module.exports = { login, signup, validateToken };
