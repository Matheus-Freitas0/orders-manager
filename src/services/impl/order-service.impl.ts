import { Inject } from "../../config/container.config";
import { OrderRequest } from "../../dto/order-request.dto";
import { OrderResponseDTO } from "../../dto/order-response.dto";
import { Order } from "../../models/order";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderValidatorStrategy } from "../../validators/order-validator.strategy";
import { AppUtils } from "../../utils/app.utils";
import { CustomerService } from "../customer.service";
import { OrderService } from "../order.service";
import { Paged } from "../../dto/paged";
import { MessagePublisher } from "../../config/messaging/message-publisher";
import { OrderPayRequest } from "../../dto/order-pay-request.dto";
import environment from "../../config/environments/environments";

export class OrderServiceImpl implements OrderService {
  @Inject("orderRepo") private repository!: OrderRepository;
  @Inject("customerSvc") private customerService!: CustomerService;
  @Inject("messagePublisher") private messagePublisher!: MessagePublisher;

  private orderValidatorStrategy!: OrderValidatorStrategy;

  constructor() {
    this.orderValidatorStrategy = new OrderValidatorStrategy();
  }

  async getByCode(code: string): Promise<Order> {
    return await this.repository.getByCode(code);
  }

  async updateOrder(code: string, order: Order): Promise<void> {
    const orderCode = await this.getByCode(code);
    if (!orderCode) {
      throw new Error(`Order with code: ${code} not found`);
    }
    await this.repository.updateOrder(code, order);
  }

  async create(orderRequest: OrderRequest): Promise<OrderResponseDTO> {
    const customer = await this.customerService.getByDocument(
      orderRequest.customerDocument
    );
    const validationErrors = await this.orderValidatorStrategy.execute(
      orderRequest,
      { customer }
    );

    if (!!validationErrors && !!validationErrors.length) {
      throw new Error(JSON.stringify(validationErrors));
    }

    const order: Order = {
      customerId: customer.id,
      code: AppUtils.genereteUUIDSimples(),
    };

    const orderSaved = await this.repository.create(order);

    const items = orderRequest.items.map((itemRequest) => {
      return {
        orderId: orderSaved.id as number,
        productId: itemRequest.productId,
        quantity: itemRequest.quantity,
        total: itemRequest.total,
        discountPercent: itemRequest.discountPercent,
      };
    });

    this.repository.createOrderItemBatch(items);

    return {
      id: orderSaved.id as number,
      code: orderSaved.code,
    };
  }

  async getAll(pageSize: number,pageNumber: number,orderStatus: string,initDate: string,endDate: string): Promise<Paged<Order>> {
    const totalItems = await this.repository.count(
      orderStatus,
      initDate,
      endDate
    );

    const orders = await this.repository.getAll(
      pageSize,
      pageNumber,
      orderStatus,
      initDate,
      endDate
    );

    const ordersPaged = new Paged<Order>(pageNumber, orders, totalItems);
    return ordersPaged;
  }
  async pay(orderPayRequest: OrderPayRequest): Promise<void> {

    const order = await this.getByCode(orderPayRequest.orderCode);

    try {
      if (order.status_payment === "NOT_PAID") {
        this.completePaymentInstrument(orderPayRequest, order);
        console.log("PAYLOAD to be sent to RABBITMQ:", orderPayRequest);

        const message = orderPayRequest;
        const exchange = environment.orderPaymentQueue.options.exchange;
        const routingKey = environment.orderPaymentQueue.options.routingKey;

        await this.messagePublisher.publish(message, exchange, routingKey);
    }
    } catch (error) {
        throw new Error("Não foi possível realizar o pagamento");     
        
    }
  }
  completePaymentInstrument(orderPayRequest: OrderPayRequest, order: Order) {
    orderPayRequest.amount = order.total || 0;
    orderPayRequest.clientDocument = order.customerDocument || "";
    orderPayRequest.partnerId = environment.ORDER_PAYMENT_PARTNER_ID || "";
  }
}
