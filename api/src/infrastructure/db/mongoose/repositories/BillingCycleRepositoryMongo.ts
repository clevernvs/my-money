import { BillingCycleRepository } from '../../../domain/billing/repositories/BillingCycleRepository'
import { BillingCycleEntity } from '../../../domain/billing/entities/BillingCycle'
import BillingCycleModel = require('../models/BillingCycleModel')

export class BillingCycleRepositoryMongo implements BillingCycleRepository {
    async create(data: BillingCycleEntity): Promise<any> {
        return new Promise((resolve, reject) => {
            const doc = new (BillingCycleModel as any)({
                name: data.name,
                month: data.month,
                year: data.year,
                credits: data.credits,
                debts: data.debts
            })
            doc.save((err: any, saved: any) => {
                if (err) return reject(err)
                resolve(saved)
            })
        })
    }
}


