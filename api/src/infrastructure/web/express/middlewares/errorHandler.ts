import _ from 'lodash'
import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    const bundle: any = (res as any).locals.bundle
    if (bundle && bundle.errors) {
        const errors: string[] = []
        _.forIn(bundle.errors, (error: any) => errors.push(error.message))
        return res.status(500).json({ errors })
    }
    next()
}


