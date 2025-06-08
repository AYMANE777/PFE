import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import {Stripe} from "stripe";
import item from "express/lib/view.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const fr_url = "http://localhost:5174";
    try {

        // Validate required fields
        if (!req.userId || !req.body.items || !req.body.amount || !req.body.address) {
            return res.json({success: false, message: "Missing required fields"});
        }
      
        

        // Create new order
        const newOrder = await orderModel.create({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        // Clear user's cart
        await userModel.findByIdAndUpdate(req.userId, {cartData: {}});

        // Prepare line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Convert to cents for Stripe
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 200, // $2.00 in cents
            },
            quantity: 1,
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${fr_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${fr_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({success: true, session_url: session.url});
    } catch (err) {
        console.error("Place order error:", err);
        res.json({success: false, message: err.message || "Error processing order"});
    }
}
const verifyOrder = async (req, res) => {
const {orderId,success} = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success: true, message: "Successfully verified"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false, message: "not verified"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//orders frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.userId})
        res.json({success:true,data:orders})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}

//Order to admin pannel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, data: orders})

    } catch (err) {
        console.log(err)
        res.json({success: false, message: "Error"})
    }
}

//api for updating
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true,message:"Successfully updated"})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}