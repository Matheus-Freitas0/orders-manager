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
        RABBITMQ_HOST: process.env.RABBITMQ_HOST || 'localhost',
        ORDER_PAYMENT_PARTNER_ID: process.env.ORDER_PAYMENT_PARTNER_ID,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: 6379,
        REDIS_DEFAULT_EXP: 3600,
        orderPaymentQueue: {
            queue: 'order_status_queue',
            options: {
                routingKey: 'order_status_key',
                exchange: 'order_status_exchange'
            }
        },
    }
}) ()