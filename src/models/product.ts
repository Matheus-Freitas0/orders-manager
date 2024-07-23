import { BlobOptions } from "buffer";

export class Product{

    constructor(
        private code: string,
        private name: string,
        private value: number,
        private stock: number,
        private active: boolean = true) {}

    getCode(){
        return this.code;
    }    
    setName(name:string){
        this.name = name;
    }
    setValue(value:number){
        this.value = value;
    }
    setStock(stock:number){
        this.stock = stock;
    }
    setActive(active:boolean){
        this.active = active;
    }
    static createProduct(body: any): Product {
        if (!body.code || typeof body.code !== 'string') {
            throw new Error('Código do produto inválido');
        }
        if (!body.name || typeof body.name !== 'string') {
            throw new Error('Nome do produto inválido');
        }
        if (!body.value || typeof body.value !== 'number' || body.value <= 0) {
            throw new Error('Valor do produto inválido');
        }
        if (typeof body.stock !== 'number' || body.stock < 0) {
            throw new Error('Estoque do produto inválido');
        }
        if (typeof body.active !== 'boolean') {
            throw new Error('Status do produto inválido');
        }
        const product = new Product(body.code, body.name, body.value, body.stock, body.active)
        return product
    }

    updateProduct(body:any):void{
        this.setName(body.name)
        this.setValue(body.value)
        this.setStock(body.stock)
    }

}

