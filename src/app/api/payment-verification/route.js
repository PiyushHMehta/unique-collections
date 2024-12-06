import crypto from "crypto";
import mongoose from "mongoose";
import { Order } from "../../../models/Orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, address, totalPrice } = await req.json();

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest === razorpay_signature) {
        await mongoose.connect(process.env.MONGO_URI);
        const session = await getServerSession(authOptions);
        const userName = session?.user?.name;
        const userEmail = session?.user?.email;

        const { _id, ...cleanedAddress } = address;

        const newCartItems = cartItems.map(item => {
            const { _id, ...rest } = item;
            return { ...rest };
        });

        const orderDoc = await Order.create({
            userName,
            userEmail,
            ...cleanedAddress,
            cartItems: newCartItems,
            totalPrice,
            createdAt: new Date(),
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
    }
}
