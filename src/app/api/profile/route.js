import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo"

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URI)
    const data = await req.json()
    const { _id, name, ...otherInfo } = data

    console.log(_id);
    

    if (_id) {
        const user = await User.findOne({ _id })
        await User.updateOne({ _id }, { name })
        await UserInfo.findOneAndUpdate({ email: user?.email }, otherInfo, { upsert: true })
    } else {
        const session = await getServerSession(authOptions)
        const email = session?.user?.email

        await User.updateOne({ email }, { name })
        await UserInfo.findOneAndUpdate({ email }, otherInfo, { upsert: true })
    }

    return Response.json(true)
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URI)

    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')

    if (_id) {
        const user = await User.findOne({ _id }).lean()
        const userInfo = await UserInfo.findOne({ email: user.email }).lean()

        return Response.json({ ...user, ...userInfo })
    } else {
        const session = await getServerSession(authOptions)
        const email = session?.user?.email
        if (!email) {
            return Response.json({})
        }
        const user = await User.findOne({ email }).lean()
        const userInfo = await UserInfo.findOne({ email }).lean()

        return Response.json({ ...user, ...userInfo })
    }
}