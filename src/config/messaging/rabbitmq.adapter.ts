import { MessagePublisher } from './message-publisher'
import client, { Connection, Channel } from 'amqplib'

export class RabbitMQAdapter implements MessagePublisher {

    channel?: Channel
    connection?: Connection
    private isConnected?: boolean

    private readonly USER = 'admin'
    private readonly PASS = 'admin'
    private readonly PORT = '5672'
    private readonly HOST = 'localhost'
    private readonly PROTOCOL = 'amqp'

    async connect (): Promise<void> {
        // amqp://admin:admin@localhost:5672
        try {
            if (this.isConnected && !!this.channel) return
            console.log('Connecting to RabbitMQ Message Server')
            const url = `${this.PROTOCOL}://${this.USER}:${this.PASS}@${this.HOST}:${this.PORT}`
            this.connection = await client.connect(url)            
            this.channel = await this.connection.createChannel()
            this.isConnected = true
            console.log('rabbitMQ connection succeeded!')
            
        } catch (error) {
            this.isConnected = false
            console.error('There was an error while trying to connect RabbitMQ server')                        
            console.error(error);
        }
    }

    async publish (message: any, queue: string, ...options: any): Promise<boolean> {
        try {
            if (!this.channel) await this.connect()
                const messageAsString = JSON.stringify(message)
                const messageBuffer = Buffer.from(messageAsString)
                this.channel?.sendToQueue(queue, messageBuffer)
    
            return true
        } catch (error) {
            console.error(`There was an error while trying to send message to queue: ${queue}`)            
            console.error(error)
            throw new Error('There was an error while trying to send message to queue')
        }
    }

}