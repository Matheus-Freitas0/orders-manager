export type OrderPayRequest = {
    orderCode: string
    cardNumber: string
    method: 'PIX' | 'DEBIT' | 'CREDIT' | 'CASH'
    partnerId: string
    amount: number
    clientDocument: string
}