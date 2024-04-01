import { Schema, model, models } from "mongoose"

const CategorySchema = new Schema({
    name: {type: String, required: true},

}, {timestamps: true})

//If model exists, use it. Otherwise, create new model named 'Category'
export const Category = models?.Category || model('Category', CategorySchema)