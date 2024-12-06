const { Schema, model, models } = require("mongoose");

const UserInfoSchema = new Schema({
    email: {type: String, required: true},
    phoneNum: { type: String, required: true},
    streetAddress: { type: String, required: true},
    city: { type: String, required: true},
    pinCode: { type: String, required: true},
    admin: {type: Boolean, default: false}
}, {
    timestamps: true
})

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema)
