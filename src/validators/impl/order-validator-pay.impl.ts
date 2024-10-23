import { OrderErrorDTO } from "../../dto/order-error.dto";
import { OrderRequest } from "../../dto/order-request.dto";
import { OrderValidator } from "../order.validator";

export class OrderValidatorPayImpl implements OrderValidator {
    async validate(orderRequest: OrderRequest, orderMetadata?: { [name: string]: any }): Promise<OrderErrorDTO[]> {
        const errors: OrderErrorDTO[] = []
    }
}      
// if (new Date(createdEnd) < new Date(createdInit)) {
//     res
//       .status(400)
//       .json({ message: "End date cannot be before start date" });
//     return;
//   }

//   const isValidFormat = (date: string): boolean => {
//     const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
//     return dateRegex.test(date);
//   };

//   if (!isValidFormat(createdInit) || !isValidFormat(createdEnd)) {
//     res
//       .status(400)
//       .json({ message: "Date must be in the format YYYY-MM-DD HH:MM:SS" });
//     return;
//   }
//   const validStatus = ["CANCELLED", "AWATING_PAYMENT", "FINISHED"];

//   if (orderStatus && !validStatus.includes(orderStatus)) {
//     res.status(400).json({
//       message: `Invalid order status. Valid statuses are: ${validStatus.join(
//         ", "
//       )}`,
//     });
//     return;
//   }

//   if (pageSize <= 0 || pageNumber <= 0) {
//     res.status(400).json({
//       message: "Page size and page number must be positive integers",
//     });
//     return;
//   }

//   const maxPageSize = 100;
//   const maxPageNumber = 1000;

//   if (pageSize > maxPageSize || pageNumber > maxPageNumber) {
//     res.status(400).json({
//       message: `Page size must be less than ${maxPageSize} and page number must be less than ${maxPageNumber}`,
//     });
//     return;
//   }