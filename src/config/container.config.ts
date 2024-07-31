import { OrderValidatorClientImpl } from '../clients/impl/order-validator-client.impl'
import { CustomerRepositoryImpl } from '../repositories/impl/customer-repository.impl'
import { CustomerServiceImpl } from '../services/impl/customer-service.impl'

export class Container {

    static instance: Container    
    dependencies: { [name: string]: any } = {}
    
    private constructor () {}

    static getInstance () {
        if (!Container.instance) Container.instance = new Container()
        return Container.instance
    }

    register () {
        this.dependencies['customerSvc'] = new CustomerServiceImpl()
        this.dependencies['customerRepo'] = new CustomerRepositoryImpl()
        this.dependencies['orderValCli'] = new OrderValidatorClientImpl()
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