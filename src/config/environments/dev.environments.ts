import dotenv from 'dotenv'

dotenv.config()

export default (() => {
    return {
        SERVER_PORT: process.env.PORT || 3000,
        DB_USER: process.env.DB_USER || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || 'root',
        DB_NAME: 'db_ecommerce',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || 3306    
    }
}) ()
