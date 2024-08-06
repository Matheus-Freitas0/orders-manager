import mysql from 'mysql2'
import { Pool } from 'mysql2/promise'
import { Datasource } from './datasource'

export class MySqlAdapter implements Datasource {

    readonly connection: Pool

    constructor() {
        const connectionPool = mysql.createPool({
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'db_ecommerce',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, 
            idleTimeout: 60000, 
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0      
        })

        this.connection = connectionPool.promise()
    }
    
    async query (statement: string, ...params: any): Promise<any> {
        const conn = await this.connection.getConnection()
        try {
            return await conn.query(statement, params)

        } catch (error) {
            throw error
        
        } finally {
            conn.release()
        }
    }

}