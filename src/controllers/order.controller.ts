import { Request, Response } from "express";
import { Inject } from "../config/container.config";
import { OrderService } from "../services/order.service";
import { Order } from "../models/order";
import { DateUtils } from "../utils/date.utils";
import { OrderPayRequest } from "../dto/order-pay-request.dto";

export class OrderController {
  @Inject("orderSvc") private service!: OrderService;

  constructor() {
    this.create = this.create.bind(this);
    this.getByCode = this.getByCode.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.getAll = this.getAll.bind(this);
    this.pay = this.pay.bind(this);
    this.orderPaymentStatusWebhook = this.orderPaymentStatusWebhook.bind(this)
  }

  async create(req: Request, res: Response) {
    try {
      const orderCode = await this.service.create(req.body);
      res.status(201).json({ orderCode });
    } catch (error: any) {
      const errors = JSON.parse(error.message);
      res.status(400).json(errors);
    }
  }

  async getByCode(req: Request, res: Response) {
    try {
      const code = req.params.code;
      const order = await this.service.getByCode(code);
  
      if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
  
      res.status(200).json(order);

    } catch (error: any) {
      if (typeof error.message === 'string') {
        res.status(400).json({ message: error.message });

      } else {
        res.status(400).json(error);
      }
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const code = req.params.code;
      const order: Order = req.body;
      await this.service.updateOrder(code, order);
      return res.status(204).json();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pageSize = req.query.pageSize
        ? parseInt(req.query.pageSize as string)
        : 10;

      const pageNumber = req.query.pageNumber
        ? parseInt(req.query.pageNumber as string)
        : 1;

      const orderStatus = (req.query.orderStatus as string) || "";

      const createdInit =
        (req.query.createdInit as string) || "2010-01-01 00:00:00";

      const createdEnd =
        (req.query.createdEnd as string) || DateUtils.getCurrentDate();
      
      const orders = await this.service.getAll(
        pageSize,
        pageNumber,
        orderStatus,
        createdInit,
        createdEnd
      );

      res.status(200).json(orders);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching orders" });
    }
  }

  async pay(req: Request, res: Response) {
    const orderPay:OrderPayRequest = req.body;

    try {
      await this.service.pay(orderPay);
      res.status(200).json({ message: 'Payment request has been sent'})
      
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }

  async orderPaymentStatusWebhook(req: Request, res: Response) {

    // todo - verificar se o token foi assinado pelo provedor de pagamento
    
    const authHeader = req.headers.Authorization        
    
    // todo - recupera os dados de pagamento e salva no banco
    
    const orderPayment = req.body
    
    console.log('####################################');
    console.log('####################################');
    console.log('webhook foi chamado', orderPayment);
    
    res.status(204).send()
  }
  
}
