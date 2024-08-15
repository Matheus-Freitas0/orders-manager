import { OrderItem } from './order-item'

export type Order = {
    id?: number
    code: string
    customerId: number
    customerDocument?: string
    created?: string
    status?: 'CANCELLED' | 'AWATING_PAYMENT' | 'FINISHED'
    status_payment?: 'NOT_PAID' | 'PAID'
    payment_method?: 'CASH' | 'CREDIT' | 'PIX' | 'DEBIT'
    items?: OrderItem[]
    total?: number
}