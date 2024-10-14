import orderPaymentQueueRegister from '../queue/order-payment-queue'
import { Inject } from './container.config'
import { MessagePublisher } from './messaging/message-publisher'
import { RabbitMQAdapter } from './messaging/rabbitmq.adapter'

export class QueueMessagesRegistry {

    @Inject('messagePublisher') 
    private messagePublisher!: MessagePublisher

    constructor () {}
    
    async register(): Promise<void> {
        const rabbitAdapter = this.messagePublisher as RabbitMQAdapter

        await orderPaymentQueueRegister(rabbitAdapter)
        
    }

}