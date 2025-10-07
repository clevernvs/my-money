declare module 'node-restful' {
    import { Model, Document, Schema, SchemaDefinition } from 'mongoose'
    import * as mongooseNS from 'mongoose'

    interface RestfulModel<T extends Document> extends Model<T> {
        methods(methods: string[] | string): this
        updateOptions(options: any): this
        after(hook: 'post' | 'put' | string, middleware: any): this
        route(name: string, handler: Function): this
        count(cb: (err: any, count: number) => void): void
        aggregate(pipeline: any[]): { exec(cb: (err: any, result: any[]) => void): void }
    }

    interface Restful {
        mongoose: typeof mongooseNS
        model<T extends Document = any>(name: string, schema: Schema): RestfulModel<T>
    }

    const restful: Restful
    export = restful
}


