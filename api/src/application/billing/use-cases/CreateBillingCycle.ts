import { BillingCycleEntity } from '../../../domain/billing/entities/BillingCycle'
import { BillingCycleRepository } from '../../../domain/billing/repositories/BillingCycleRepository'

export class CreateBillingCycle {
    private readonly repo: BillingCycleRepository

    constructor(repo: BillingCycleRepository) {
        this.repo = repo
    }

    async execute(input: {
        name: string
        month: number
        year: number
        credits?: { name: string; value: number }[]
        debts?: { name: string; value: number; status?: 'PAGO' | 'PENDENTE' | 'AGENDADO' }[]
    }) {
        const entity = new BillingCycleEntity(input)
        const created = await this.repo.create(entity)
        return created
    }
}


