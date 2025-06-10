import mongoose from "mongoose";



const userSchema = await mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}},
    createdAt: { type: Date, default: Date.now },
    lastLogin: {
        type: Date,
        default: null
    }

},{minimize: false});


const userModel = mongoose.model.user || mongoose.model("user", userSchema);
export default userModel;