import { DatasourceConfig } from '../config/datasource.config'
import queries from '../../files/categories-queries.json'
import { Category } from '../models/category'

export class CategoryRepository {

    constructor(private datasourceConfig: DatasourceConfig) {}

    async getAll(): Promise<Category[]> {
        const conn = await this.datasourceConfig.connection.getConnection()
        const data = await conn.query(queries.getAll)
        const resultSet = data[0]
        return resultSet as Category[]
    }

}
