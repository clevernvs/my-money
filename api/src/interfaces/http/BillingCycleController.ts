import { Request, Response } from 'express'
import { CreateBillingCycle } from '../../application/billing/use-cases/CreateBillingCycle'
import { BillingCycleRepositoryMongo } from '../../infrastructure/db/mongoose/repositories/BillingCycleRepositoryMongo'

const repo = new BillingCycleRepositoryMongo()
const createUseCase = new CreateBillingCycle(repo)

export async function create(req: Request, res: Response) {
    try {
        const result = await createUseCase.execute(req.body)
        return res.status(201).json(result)
    } catch (err: any) {
        return res.status(400).json({ errors: [err.message || 'Erro ao criar BillingCycle'] })
    }
}


