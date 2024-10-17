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