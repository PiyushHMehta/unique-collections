import { Category } from "../../../models/Category"
import mongoose from "mongoose"

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URI)
    const { name } = await req.json()
    const categoryDoc = await Category.create({ name })
    return Response.json(categoryDoc)
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URI)
    const { _id, name } = await req.json()
    const updatedCategory = await Category.updateOne({ _id }, { name })
    return Response.json(updatedCategory) 
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URI)
    return Response.json(
        await Category.find()
    )
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URI)
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Category.findByIdAndDelete({_id})
    return Response.json(true)
}
