import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"    

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL) 
    const data = await req.json()
    const session = await getServerSession(authOptions)
    const email = session?.user?.email

    //const user = await User?.findOne({ email })

    /*
    -Used if potentially not including a field on registration
    // Add keys to update object then send; Avoid updating database multiple times
    const update = {}

    if ( 'name' in data ) {
        update.name = data.name
    }
    if ( 'image' in data ) {
        update.image = data.image
    }
    if ( Object.keys(update).length > 0 ) {
        console.log(update)
        await User.updateOne({email}, update)
    }
    */

    // Sending all profile data at once
    await User.updateOne({email}, data)

    return Response.json(true)
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOptions)
    const email = session?.user?.email
    if (!email) {
        return Response.json({})
    }
    return Response.json(
        await User.findOne({ email })
    )
}