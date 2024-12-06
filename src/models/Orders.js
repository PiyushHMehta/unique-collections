import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
    userName: String,
    userEmail: String,
    phoneNum: String,
    streetAddress: String,
    city: String,
    pinCode: String,
    cartItems: Object,
    createdAt: { type: Date, default: Date.now } // Custom createdAt field
});

export const Order = models?.Order || model('Order', OrderSchema);
