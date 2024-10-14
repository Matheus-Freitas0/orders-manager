import { RabbitMQAdapter } from '../config/messaging/rabbitmq.adapter'
import environment from '../config/environments/environments'

export default async function orderPaymentQueueRegister (messagePublisher: RabbitMQAdapter) {
    const exchangeType = 'direct'
    const queue = environment.orderPaymentQueue.queue
    const key = environment.orderPaymentQueue.options.routingKey
    const exchange = environment.orderPaymentQueue.options.exchange
    await messagePublisher.createQueue(queue) 
    await messagePublisher.createExchange(exchange, exchangeType)
    await messagePublisher.bindQueueToExchange(queue, exchange, key)
    console.log(`rabbitmq queue: ${queue} has been created`)    
}