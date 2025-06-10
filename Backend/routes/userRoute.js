import express from "express";
import {getTotalUsers, getWeeklyClientStats, loginUser, registerUser} from "../controllers/userController.js";



const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/total", getTotalUsers);
userRouter.get('/weekly-stats', getWeeklyClientStats);



export default userRouter;