import { Category } from '../models/category'

export type ProductResponseDTO = {
    id: number
    name: string
    value: number
    stock: number
    category: Category
}