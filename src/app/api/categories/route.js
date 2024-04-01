import { Category } from "@/models/category"

export async function POST(req) {
    const { name } = await req.json()
    const categoryDoc = await Category.create({name})
    return Response.json(categoryDoc)
}

export async function PUT(req) {
    const {_id, name} = await req.json()
    await Category.updateOne({_id}, {name}) // Update document with given id; Change name
    return Response.json(true)
}

export async function GET() {
    return Response.json(
        await Category.find() // Use find to get all categories
    )
}