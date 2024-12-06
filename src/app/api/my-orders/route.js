import { Order } from "@/models/Orders";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        // Get the user session
        const session = await getServerSession(authOptions);
        if (!session || !session.user.email) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
        }

        // Fetch orders based on user email
        const orders = await Order.find({ userEmail: session.user.email });
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 });
    }
}
