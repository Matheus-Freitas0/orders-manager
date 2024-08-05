import { OrderValidatorClientImpl } from '../clients/impl/order-validator-client.impl'
import { CategoryRepositoryImpl } from '../repositories/impl/category-repository'
import { CustomerRepositoryImpl } from '../repositories/impl/customer-repository.impl'
import { ProductRepositoryImpl } from '../repositories/impl/product-repository.impl'
import { CustomerServiceImpl } from '../services/impl/customer-service.impl'
import { ProductServiceImpl } from '../services/impl/product-service.impl'
import { MongoAdapter } from './database/mongo-adapter'
import { MySqlAdapter } from './database/mysql-adapter'

export class Container {

    static instance: Container    
    dependencies: { [name: string]: any } = {}
    
    private constructor () {}

    static getInstance () {
        if (!Container.instance) Container.instance = new Container()
        return Container.instance
    }

    register () {
        this.dependencies['mysql'] = new MySqlAdapter()
        this.dependencies['mongo'] = new MongoAdapter()
        this.dependencies['customerSvc'] = new CustomerServiceImpl()
        this.dependencies['customerRepo'] = new CustomerRepositoryImpl()
        this.dependencies['orderValCli'] = new OrderValidatorClientImpl()
        this.dependencies['categoryRepo'] = new CategoryRepositoryImpl()
        this.dependencies['productRepo'] = new ProductRepositoryImpl()
        this.dependencies['productSvc'] = new ProductServiceImpl()
    }

    getDependency (name: string) {
        if (!this.dependencies[name]) throw new Error('Dependency not Found')
        return this.dependencies[name]
    }

}

export function Inject (name: string) {
	return function (target: any, propertyKey: string) {
		target[propertyKey] = new Proxy({}, {
			get (target: any, propertyKey: string) {
                const container = Container.getInstance()
                const dependency = container.getDependency(name)
                return dependency[propertyKey]
			}
		});
	}
}