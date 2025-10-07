import mongoose from 'mongoose'

    ; (mongoose as any).Promise = (global as any).Promise

export default (mongoUrl?: string) => {
    const url = mongoUrl || process.env.MONGO_URL || 'mongodb://localhost/mymoney'
    return (mongoose as any).connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

    ; (mongoose as any).Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
    ; (mongoose as any).Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
    ; (mongoose as any).Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
    ; (mongoose as any).Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."


