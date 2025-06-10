import foodModel from "../models/foodModel.js";
import * as fs from "node:fs";
import orderModel from "../models/orderModel.js";

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,


    })
    try{
        await food.save();
        res.json({success: true, message:"success"});
    }catch(err){
            console.log(err);
            res.json({success: false, message:"error"});
    }
}





//food List
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data : foods});
    }catch(err){
        console.log(err);
        res.json({success: false, message:"error"});
    }
}
//Remove Food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {
        })
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:"Food Removed"});
    } catch (err) {
        console.log(err)
        res.json({success: false, message:"error"});
    }
}
//Update Food
const updateFood = async (req, res) => {
    try {
        const { id, name, description, category, price } = req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            { name,description, category, price },
            { new: true } // returns the updated document
        );

        if (!updatedFood) {
            return res.json({ success: false, message: "Food not found" });
        }

        res.json({ success: true, message: "Food updated", data: updatedFood });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error updating food" });
    }
};



// Get total number of food items
const getTotalFood = async (req, res) => {
    try {
        const count = await foodModel.countDocuments();
        res.json({ success: true, total: count });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "error" });
    }
}

export {addFood,listFood,removeFood,getTotalFood,updateFood };