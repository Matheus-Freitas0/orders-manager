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
        const errors: OrderErrorDTO[] = [];

        // Validar customer
        try {
            const customer = await this.customerService.getByDocument(orderRequest.customerDocument);
            if (!customer) {
                errors.push({ title: 'customerDocument', message: 'Customer not found' });
            }
        } catch (error) {
            errors.push({ title: 'customerDocument', message: 'error when trying to find customer' });
        }

        // Validar produtos
        try {
            const productsCode = orderRequest.items.map(item => item.productCode);
            const products = await this.productService.getProductsByCodeIn(productsCode);
            if (orderRequest.items.length !== products.length) {
                errors.push({ title: 'items', message: 'The products found did not match the request' });
            }
        } catch (error) {
            errors.push({ title: 'items', message: 'error when trying to find products' });
        }

        return errors;
    }
}
    // validar stock
    // validar limite de pedidos em aberto por customer
    // validar desconto
    // validar preco do produto
