export type Credit = { name: string; value: number }
export type DebtStatus = 'PAGO' | 'PENDENTE' | 'AGENDADO'
export type Debt = { name: string; value: number; status?: DebtStatus }

export class BillingCycleEntity {
    public readonly name: string
    public readonly month: number
    public readonly year: number
    public readonly credits: Credit[]
    public readonly debts: Debt[]

    constructor(params: { name: string; month: number; year: number; credits?: Credit[]; debts?: Debt[] }) {
        const { name, month, year, credits = [], debts = [] } = params
        if (!name) throw new Error('Nome é obrigatório')
        if (month < 1 || month > 12) throw new Error('Mês inválido')
        if (year < 1970 || year > 2100) throw new Error('Ano inválido')
        this.name = name
        this.month = month
        this.year = year
        this.credits = credits
        this.debts = debts
    }
}


