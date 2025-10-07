import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction) => {
    const token = (req.body && (req.body as any).token) || (req.query && (req.query as any).token) || req.headers['authorization']

    if (!token) return res.status(403).send({ errors: ['No token provided.'] })

    const tokenStr = Array.isArray(token) ? token[0] : token
    const cleaned = (tokenStr as string).startsWith('Bearer ')
        ? (tokenStr as string).substring(7)
        : (tokenStr as string)

    jwt.verify(cleaned, process.env.AUTH_SECRET || 'my-secret', function (err, decoded) {
        if (err) return res.status(403).send({ errors: ['Failed to authenticate token.'] })
            ; (req as any).decoded = decoded
        next()
    })
}


