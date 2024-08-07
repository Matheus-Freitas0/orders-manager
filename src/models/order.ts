export type Order = {
    id: number
    code: string
    created: string
    status: 'CANCELLED' | 'AWATING_PAYMENT' | 'FINISHED'
    statusPayment: 'NOT_PAID' | 'PAID'
    paymentMethod: 'CASH' | 'CREDIT' | 'PIX' | 'DEBIT'
    customerId: number    
}