import dotenv from 'dotenv'

dotenv.config()

export default (() => {
    return {
        SERVER_PORT: process.env.PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: 'db_ecommerce',
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT    
    }
}) ()