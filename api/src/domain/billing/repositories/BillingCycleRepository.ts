import { BillingCycleEntity } from '../entities/BillingCycle'

export interface BillingCycleRepository {
    create(data: BillingCycleEntity): Promise<any>
}


