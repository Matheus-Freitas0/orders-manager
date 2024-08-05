import { Category } from '../../models/category';
import { Repository } from '../repository';
import { CategoryRepository } from './../category.repository';
import queries from '../../../files/categories-queries.json'

export class CategoryRepositoryImpl extends Repository implements CategoryRepository {

    async getAll(): Promise<Category[]> {
        const data = await this.datasource.query(queries.getAll)
        const resultSet = data[0]
        return resultSet as Category[]
    }
    
    async getById(id: number): Promise<Category> {
        const data = await this.datasource.query(queries.getById, id)
        const resultSet = data[0]
        return resultSet[0] as Category
    }
    
}