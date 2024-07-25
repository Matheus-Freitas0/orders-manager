import * as crypto from 'crypto'

export class Product{

    constructor(
        readonly code: string,
        readonly name: string,
        readonly value: number,
        readonly stock: number,
        readonly active: boolean = true) {}

    static createProduct(body: any): Product {
        if (!body.name || typeof body.name !== 'string') {
            throw new Error('Nome do produto inválido');
        }
        if (!body.value || typeof body.value !== 'number' || body.value <= 0) {
            throw new Error('Valor do produto inválido');
        }
        if (typeof body.stock !== 'number' || body.stock < 0) {
            throw new Error('Estoque do produto inválido');
        }
        const code = crypto.randomUUID()

        const product = new Product(code, body.name, body.value, body.stock, body.active)
        return product
    }

}

