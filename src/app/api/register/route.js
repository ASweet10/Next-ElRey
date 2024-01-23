import { User } from "@/models/user"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

export async function POST(req) {
    const body = await req.json()
    mongoose.connect(process.env.MONGO_URL)

    const password = body.password
    if(!password?.length || password.length < 8) {
        new Error('Password must be at least 8 characters')
    }

    const notHashedPassword = password
    const salt = bcrypt.genSaltSync(10)
    body.password = bcrypt.hashSync(notHashedPassword, salt)

    const createdUser = await User.create(body)
    return Response.json(createdUser)
}