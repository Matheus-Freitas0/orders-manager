import { Inject } from '../../config/container.config'
import { OrderRequest } from '../../dto/order-request.dto'
import { OrderResponseDTO } from '../../dto/order-response.dto'
import { Order } from '../../models/order'
import { OrderRepository } from '../../repositories/order.repository'
import { AppUtils } from '../../utils/app.utils'
import { OrderValidator } from '../../validators/order.validator'
import { CustomerService } from '../customer.service'
import { OrderService } from '../order.service'

export class OrderServiceImpl implements OrderService {

    @Inject('orderRepo') private repository!: OrderRepository
    @Inject('customerSvc') private customerService!: CustomerService
    @Inject('orderValidator') private orderValidator!: OrderValidator

    async create(orderRequest: OrderRequest): Promise<OrderResponseDTO> {
        const validationErrors = await this.orderValidator.validate(orderRequest)

        if (!!validationErrors && !!validationErrors.length) {
            throw new Error(JSON.stringify(validationErrors))
        }

        const customer = await this.customerService.getByDocument(orderRequest.customerDocument)
                    
        const order: Order = {
            customerId: customer.id,
            code: AppUtils.genereteUUIDSimples()
        }

        const orderSaved = await this.repository.create(order)

        const items = orderRequest.items.map(itemRequest => {
            return {
                orderId: orderSaved.id as number,
                productId: itemRequest.productId,
                quantity: itemRequest.quantity,
                total: itemRequest.total,
                discountPercent: itemRequest.discountPercent            
            }            
        })

        this.repository.createOrderItemBatch(items)

        return {
            id: orderSaved.id as number,
            code: orderSaved.code
        }
    }

}