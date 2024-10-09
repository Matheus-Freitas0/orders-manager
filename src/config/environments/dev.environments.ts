import dotenv from 'dotenv'

dotenv.config()

export default (() => {
    return {
        SERVER_PORT: process.env.PORT || 3000,
        DB_USER: process.env.DB_USER || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || 'root',
        DB_NAME: 'db_ecommerce',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || 3306,
        RABBITMQ_USER: process.env.RABBITMQ_USER || 'admin',
        RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD || 'admin',
        RABBITMQ_PORT: 5672,
        RABBITMQ_HOST: 'localhost',
        orderPaymentQueue: {
            queue: 'order_status_queue',
            options: {
                routingKey: 'order_status_key',
                exchange: 'order_status_exchange'
            }
        },
    }
}) ()