import { InjectArray } from '../config/container.config'
import { OrderErrorDTO } from '../dto/order-error.dto'
import { OrderRequest } from '../dto/order-request.dto'
import { OrderValidator } from '../validators/order.validator'

export class OrderValidatorStrategy {

    @InjectArray('orderValidator') 
    private orderValidators!: OrderValidator[]

    async execute(orderRequest: OrderRequest): Promise<OrderErrorDTO[]> {
        let errors: OrderErrorDTO[] = []
        for (const validator of this.orderValidators) {
            const validationErrors = await validator.validate(orderRequest)
            errors = [...errors, ...validationErrors]
        }
        return errors
    }

}