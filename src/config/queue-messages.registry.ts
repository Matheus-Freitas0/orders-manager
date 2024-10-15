import orderPaymentQueueRegister from '../queue/order-payment-queue'
import { Inject } from './container.config'
import { MessagePublisher } from './messaging/message-publisher'
import { RabbitMQAdapter } from './messaging/rabbitmq.adapter'

export class QueueMessagesRegistry {

    @Inject('rabbit-mq') 
    private rabbitMQAdapter!: RabbitMQAdapter

    constructor () {}
    
    async register(): Promise<void> {
        const rabbitAdapter = this.rabbitMQAdapter as RabbitMQAdapter

        await orderPaymentQueueRegister(rabbitAdapter)
        
    }

}