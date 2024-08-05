import { Category } from '../models/category'

export interface CategoryRepository {

    getAll(): Promise<Category[]> 
    getById(id:number): Promise<Category>
}
