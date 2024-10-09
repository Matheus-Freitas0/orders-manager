import { MessagePublisher } from './message-publisher'
import client, { Connection, Channel, Options } from 'amqplib'
import environment from '../environments/environments'

export class RabbitMQAdapter implements MessagePublisher {

    channel!: Channel
    connection!: Connection
    private isConnected!: boolean

    private readonly USER = environment.RABBITMQ_USER
    private readonly PASS = environment.RABBITMQ_PASSWORD
    private readonly PORT = environment.RABBITMQ_PORT
    private readonly HOST = environment.RABBITMQ_HOST

    async connect (): Promise<void> {
        if (this.isConnected && !!this.channel) return
        console.log('Connecting to RabbitMQ Message Server')
        const url = `amqp://${this.USER}:${this.PASS}@${this.HOST}:${this.PORT}`
        this.connection = await client.connect(url)            
        this.channel = await this.connection.createChannel()
        this.isConnected = true
        console.log('rabbitMQ connection succeeded!')
    }

    async createExchange(exchange: string, type: string, options?: Options.AssertExchange): Promise<void> {
        if (!this.channel) await this.connect()
        await this.channel.assertExchange(exchange, type, options)
    }

    async createQueue(queue: string, options?: Options.AssertQueue): Promise<void> {
        if (!this.channel) await this.connect()
        await this.channel.assertQueue(queue, options)
    }

    async bindQueueToExchange(queue: string, exchange: string, routingKey: string): Promise<void> {
        if (!this.channel) await this.connect()
        await this.channel.bindQueue(queue, exchange, routingKey)
    }

    async close(): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.close()
                console.log('Channel closed.')
            }
            if (this.connection) {
                await this.connection.close()
                console.log('Connection closed.')
            }
        } catch (error) {
            console.error('Error closing RabbitMQ connection or channel:', error)
        }
    }

    async publishToExchange(exchange: string, routingKey: string, message: string, options?: Options.Publish): Promise<boolean> {
        if (!this.channel) await this.connect()
        const success = this.channel.publish(exchange, routingKey, Buffer.from(message), options)
        return success
    }
    
    async publish (message: any, queue: string, options: any): Promise<boolean> {
        try {
            await this.createQueue(queue)
            await this.createExchange(options.exchange, options.type || 'direct')
            await this.bindQueueToExchange(queue, options.exchange, options.routingKey)
            const isMessageSent = await this.publishToExchange(options.exchange, options.routingKey, JSON.stringify(message))
            return isMessageSent

        } catch (error) {
            const msg = 'There was an error while trying to send message to queue'
            console.error(`${msg}: ${queue}`)            
            console.error(error)
            throw new Error(msg)

        } finally {
            await this.close()
        }
    }

}