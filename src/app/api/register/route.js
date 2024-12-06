import { User } from "@/models/User"
import mongoose from "mongoose"
const bcrypt = require('bcryptjs');

export async function POST(req) {
    const body = await req.json()
    mongoose.connect(process.env.MONGO_URI)
    const pass = body.password
    if(!pass?.length || pass.length < 5) {
        new Error('Password must be atleast 5 characters')
        return false;
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    body.password = hash
        
    const newUser = await User.create(body)
    return Response.json(newUser)

}