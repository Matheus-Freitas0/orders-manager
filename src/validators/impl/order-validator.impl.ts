import { OrderErrorDTO } from "../../dto/order-error.dto";
import { OrderRequest } from "../../dto/order-request.dto";
import { OrderValidator } from "../order.validator";
import { Inject } from '../../config/container.config';
import { ProductService } from "../../services/product.service";
import { CustomerService } from "../../services/customer.service";

export class OrderValidatorImpl implements OrderValidator {

    @Inject('productSvc') private productService!: ProductService;
    @Inject('customerSvc') private customerService!: CustomerService;
    
    async validate(orderRequest: OrderRequest): Promise<OrderErrorDTO[]> {
        const errors: OrderErrorDTO[] = []

        try {
            const customer = await this.customerService.getByDocument(orderRequest.customerDocument)
            if (!customer) {
                errors.push({ title: 'customerDocument', message: 'Customer not found' })
            }
        } catch (error) {
            errors.push({ title: 'customerDocument', message: 'error when trying to find customer' })
        }

        try {
            const productsCode = orderRequest.items.map(item => item.productCode)
            const products = await this.productService.getProductsByCodeIn(productsCode)
            
            if (orderRequest.items.length !== products.length) {
                errors.push({ title: 'items', message: 'The products found did not match the request' })
            }
        } catch (error) {
            errors.push({ title: 'items', message: 'Error when trying to find products' })
        }
    
        try {
            const productsCode = orderRequest.items.map(item => item.productCode)
            const products = await this.productService.getProductsByCodeIn(productsCode)
            
            orderRequest.items.forEach(item => {
                const product = products.find(p => p.code === item.productCode)
                
                if (item.quantity > product!.stock) {
                    errors.push({ title: 'stock', message: `Product ${item.productCode} does not have enough stock` })
                }
            })
        } catch (error) {
            errors.push({ title: 'stock', message: 'Error when trying to verify stock' })
        }

        try{
            const productsCode = orderRequest.items.map(item => item.productCode)
            const products = await this.productService.getProductsByCodeIn(productsCode)

            orderRequest.items.forEach(item =>{
                const product = products.find(p => p.code === item.productCode)
                if(item.total !== product!.value)
                    errors.push({ title: 'preco', message: `Product ${item.productCode} has different price`})
            })
        
        } catch (error) {
            errors.push({ title: 'preco', message: 'Error when trying to verify price'})
        }

        return errors
    }
}
        // validar limite de pedidos em aberto por customer
        // validar desconto     
