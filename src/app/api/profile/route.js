import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"    

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json()
    const {_id, ...profileInfo} = data

    if (_id) {
        await User.updateOne({_id}, data)
    } else {
        const session = await getServerSession(authOptions)
        const email = session?.user?.email
        await User.updateOne({email}, data)
    }


    /* // Add keys to update object then send; Avoid updating database multiple times
    const update = {}
    if ( 'name' in data ) {
        update.name = data.name
    }
    if ( 'image' in data ) {
        update.image = data.image
    }
    if ( Object.keys(update).length > 0 ) {
        await User.updateOne({email}, update)
    } */
    return Response.json(true)
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL)

    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')

    if(_id) {
        const user = await User.findOne({_id}).lean()
        return Response.json(user)
    } else {
        const session = await getServerSession(authOptions)
        const email = session?.user?.email
        if (!email) {
            return Response.json({})
        }
        return Response.json(
            await User.findOne({ email })
        )
    }

}