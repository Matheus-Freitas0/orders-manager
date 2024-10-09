import { Request, Response } from "express";
import { Inject } from "../config/container.config";
import { OrderService } from "../services/order.service";
import { Order } from "../models/order";
import { DateUtils } from "../utils/date.utils";

export class OrderController {
  @Inject("orderSvc") private service!: OrderService;

  constructor() {
    this.create = this.create.bind(this);
    this.getByCode = this.getByCode.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.getAll = this.getAll.bind(this);
    this.pay = this.pay.bind(this);
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
      res.status(200).json(order);
    } catch (error: any) {
      const errors = JSON.parse(error.message);
      res.status(400).json(errors);
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

      // jogar estas validações para o strategy
      
      if (new Date(createdEnd) < new Date(createdInit)) {
        res
          .status(400)
          .json({ message: "End date cannot be before start date" });
        return;
      }

      const isValidFormat = (date: string): boolean => {
        const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        return dateRegex.test(date);
      };

      if (!isValidFormat(createdInit) || !isValidFormat(createdEnd)) {
        res
          .status(400)
          .json({ message: "Date must be in the format YYYY-MM-DD HH:MM:SS" });
        return;
      }
      const validStatus = ["CANCELLED", "AWATING_PAYMENT", "FINISHED"];

      if (orderStatus && !validStatus.includes(orderStatus)) {
        res.status(400).json({
          message: `Invalid order status. Valid statuses are: ${validStatus.join(
            ", "
          )}`,
        });
        return;
      }

      if (pageSize <= 0 || pageNumber <= 0) {
        res.status(400).json({
          message: "Page size and page number must be positive integers",
        });
        return;
      }

      const maxPageSize = 100;
      const maxPageNumber = 1000;

      if (pageSize > maxPageSize || pageNumber > maxPageNumber) {
        res.status(400).json({
          message: `Page size must be less than ${maxPageSize} and page number must be less than ${maxPageNumber}`,
        });
        return;
      }

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
    const orderPay = req.body;

    try {
      await this.service.pay(orderPay);
    } catch (error: any) {
      const errors = JSON.parse(error.message);
      res.status(400).json(errors);
    }
  }
}
