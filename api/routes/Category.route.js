import express from 'express'
import { getAllCategory } from '../controllers/Category.controller.js'

const CategoryRoute = express.Router()

// Only keep the get all categories route - no admin management needed
CategoryRoute.get('/all-category', getAllCategory)

export default CategoryRoute