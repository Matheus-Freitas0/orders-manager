// if (new Date(endDate) < new Date(initDate)) {
//     errors.push({ title: 'createdEnd', message: 'End date cannot be before start date' });
// }
// const isValidFormat = (date: string): boolean => {
//     const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
//     return dateRegex.test(date);
// };
// if (!isValidFormat(initDate) || !isValidFormat(endDate)) {
//     errors.push({ title: 'date', message: 'Date must be in the format YYYY-MM-DD HH:MM:SS' });
// }
// const validStatus = ["CANCELLED", "AWAITING_PAYMENT", "FINISHED"];
// if (orderStatus && !validStatus.includes(orderStatus)) {
//     errors.push({ title: 'orderStatus', message: `Invalid order status. Valid statuses are: ${validStatus.join(", ")}` });
// }
// if (pageSize <= 0 || pageNumber <= 0) {
//     errors.push({ title: 'pagination', message: 'Page size and page number must be positive integers' });
// }
// const maxPageSize = 100;
// const maxPageNumber = 1000;
// if (pageSize > maxPageSize || pageNumber > maxPageNumber) {
//     errors.push({ title: 'pagination', message: `Page size must be less than ${maxPageSize} and page number must be less than ${maxPageNumber}` });
// }
// return errors;
// }