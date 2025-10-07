import _ from 'lodash'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User = require('../../infrastructure/db/mongoose/models/UserModel')
import { Request, Response } from 'express'

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendErrorsFromDB = (res: Response, dbErrors: any) => {
    const errors: string[] = []
    _.forIn(dbErrors.errors, (error: any) => errors.push(error.message))
    return res.status(400).json({ errors })
}

const signMinimal = (user: any) => {
    const payload = { _id: user._id, name: user.name, email: user.email }
    const secret = process.env.AUTH_SECRET || 'my-secret'
    return jwt.sign(payload, secret, { expiresIn: '1 day' })
}

const login = (req: Request, res: Response) => {
    const email = (req.body && (req.body as any).email) || ''
    const password = (req.body && (req.body as any).password) || ''

    User.findOne({ email }, (err: any, user: any) => {
        if (err) return sendErrorsFromDB(res, err)
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = signMinimal(user)
            const { name, email } = user
            return res.json({ name, email, token })
        }
        return res.status(400).send({ errors: ['Usuário ou Senha está inválido.'] })
    })
}

const validateToken = (req: Request, res: Response) => {
    const token = (req.body && (req.body as any).token) || ''
    jwt.verify(token, process.env.AUTH_SECRET || 'my-secret', function (err) {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req: Request, res: Response) => {
    const name = (req.body && (req.body as any).name) || ''
    const email = (req.body && (req.body as any).email) || ''
    const password = (req.body && (req.body as any).password) || ''
    const confirmPassword = (req.body && (req.body as any).confirm_password) || ''

    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informa está inválido'] })
    }
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6 - 20.'
            ]
        })
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }

    User.findOne({ email }, (err: any, user: any) => {
        if (err) return sendErrorsFromDB(res, err)
        if (user) return res.status(400).send({ errors: ['Usuário já cadastrado.'] })

        const newUser = new User({ name, email, password: passwordHash })
        newUser.save((err: any) => {
            if (err) return sendErrorsFromDB(res, err)
            return login(req, res)
        })
    })
}

export = { login, signup, validateToken }


