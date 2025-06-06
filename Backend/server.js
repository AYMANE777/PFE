import express from 'express';
import cors from 'cors';
import {connectDb} from './config/db.js';
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import reservationRouter from "./routes/reservationRoute.js";



import dotenv from 'dotenv';
dotenv.config(); // doit être appelé AVANT tout usage de process.env

//app config

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/image',express.static('uploads'));

// Db connection
connectDb()

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRoute);
app.use("/api/reservation",reservationRouter);



app.get("/", (req, res) => {
    res.send("WORKING");
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

