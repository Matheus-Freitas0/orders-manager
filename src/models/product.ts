import * as crypto from 'crypto'

export class Product {

    constructor(readonly code: string,
                readonly name: string, 
                readonly value: number, 
                readonly stock: number,
                readonly categoryId: number,
                readonly active: boolean) {}

    static createProduct(body: any): Product {
        if (!body.value || body.value == 0 || typeof body.value === 'string') {
            throw new Error('product value is invalid')
        }

        const code = crypto.randomUUID()

        const product = new Product(code, body.name, body.value, body.stock, body.categoryId, true)
        return product
    }

}
