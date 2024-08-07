import mysql from 'mysql2'
import { Pool } from 'mysql2/promise'
import { Datasource } from './datasource'
import environment from '../environments/environments'

export class MySqlAdapter implements Datasource {

    readonly connection: Pool

    constructor() {
        const connectionPool = mysql.createPool({
            port: environment.DB_PORT as number,
            host: environment.DB_HOST,
            user: environment.DB_USER,
            password: environment.DB_PASSWORD,
            database: environment.DB_NAME,
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