// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { Order } from "../../../models/Orders";

// export async function POST(req) {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         const session = await getServerSession(authOptions);
//         const userName = session?.user?.name;
//         const userEmail = session?.user?.email;
//         const { address, cartItems } = await req.json();

//         // Server-side validation to check if cartItems is empty
//         if (!cartItems || cartItems.length === 0) {
//             return new Response(JSON.stringify({ error: "Cart is empty, cannot place order" }), { status: 400 });
//         }

//         // Remove _id from address if it exists
//         const { _id, ...cleanedAddress } = address;

//         // Remove existing _id from cartItems
//         const newCartItems = cartItems.map(item => {
//             const { _id, ...rest } = item; // Remove the existing _id
//             return { ...rest };
//         });

//         // Create order with a custom createdAt timestamp
//         const orderDoc = await Order.create({
//             userName,
//             userEmail,
//             ...cleanedAddress,
//             cartItems: newCartItems,
//             createdAt: new Date() // Set the createdAt field manually
//         });

//         return new Response(JSON.stringify(orderDoc), { status: 201 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: "Failed to create order" }), { status: 500 });
//     }
// }

// export async function GET() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         const orders = await Order.find();
//         return new Response(JSON.stringify(orders), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 });
//     }
// }


import { Order } from "@/models/Orders";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const orders = await Order.find();
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 });
    }
}

export async function POST(req) {

    try {
        const session = await getServerSession(authOptions);
        const userName = session?.user?.name;
        const userEmail = session?.user?.email;

        const { totalPrice } = await req.json();

        if (!userName || !userEmail) {
            return new Response(JSON.stringify({ error: "Invalid credentials, cannot proceed" }), { status: 400 });
        }

        if (!totalPrice || totalPrice <= 0) {
            return new Response(JSON.stringify({ error: "Invalid amount, cannot proceed" }), { status: 400 });
        }

        const razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            amount: totalPrice * 100, // Convert to paise
            currency: "INR",
            payment_capture: 1
        };

        const order = await razorpayInstance.orders.create(options);

        return new Response(JSON.stringify({ id: order.id, currency: order.currency, amount: order.amount }), { status: 201 });
    } catch (error) {
        console.error('Checkout Error:', error.message || error);
        return new Response(JSON.stringify({ error: "Failed to initiate payment" }), { status: 500 });
    }
}
