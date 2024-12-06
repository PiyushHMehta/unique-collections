import { MenuItem } from "@/models/MenuItem"
import mongoose from "mongoose"

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URI)
    const data = await req.json()
    const newMenuItem = await MenuItem.create(data)
    return Response.json(newMenuItem)
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URI)
    const { _id, ...data } = await req.json()
    await MenuItem.findByIdAndUpdate(_id, data)
    return Response.json(true)
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URI)
    return Response.json(
        await MenuItem.find()
    )
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URI)
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await MenuItem.findByIdAndDelete({_id})
    return Response.json(true)
}