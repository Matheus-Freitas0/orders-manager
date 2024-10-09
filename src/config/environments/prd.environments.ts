import dotenv from 'dotenv'

dotenv.config()

export default (() => {
    return {
        SERVER_PORT: process.env.PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: 'db_ecommerce',
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        RABBITMQ_USER: process.env.RABBITMQ_USER,
        RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD,
        RABBITMQ_PORT: 5672,
        RABBITMQ_HOST: '',
        orderPaymentQueue: {
            queue: 'order_status_queue',
            options: {
                routingKey: 'order_status_key',
                exchange: 'order_status_exchange'
            }
        },
    }
}) ()