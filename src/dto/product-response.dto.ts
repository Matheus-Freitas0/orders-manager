import { Category } from '../models/category'

export type ProductResponseDTO = {
    id: number
    code: string
    name: string
    value: number
    stock: number
    category: Category
}