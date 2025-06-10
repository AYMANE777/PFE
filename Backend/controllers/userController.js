import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//login user
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if(!user){return res.json({success: false, message: "User Doesn't exists"});}
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Wrong Password"});
        }
        user.lastLogin = new Date();
        await user.save();
        const token = createToken(user._id);
        res.json({success: true, token: token});
    }catch(err) {
        console.log(err)
        return res.json({success: false, message: "Error"});
    }
}
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,msg:"User already exists"});
        }
        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,msg:"Please enter a valid email"});
        }
        if(password.length < 8){
            return res.json({success:false,msg:"Please use Strong Password"});
        }
        //Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser  = new userModel({
            name:name,
            email:email,
            password:hashedPassword,

        })

        const user  =  await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,msg:"User created successfully",token:token});
    } catch (err) {
        console.log(err)
        res.json({success:false,msg:"Error creating user."});
    }
}
// Get total number of users
const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        res.json({ success: true, total: totalUsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch total users." });
    }
};

// Get weekly client statistics
const getWeeklyClientStats = async (req, res) => {
    try {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Lundi de cette semaine
        startOfWeek.setHours(0, 0, 0, 0);

        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const result = {};

        for (let i = 0; i < 7; i++) {
            const dayStart = new Date(startOfWeek);
            dayStart.setDate(startOfWeek.getDate() + i);

            const dayEnd = new Date(dayStart);
            dayEnd.setDate(dayStart.getDate() + 1);

            // Compter les nouvelles inscriptions (register)
            const registeredCount = await userModel.countDocuments({
                createdAt: {
                    $gte: dayStart,
                    $lt: dayEnd
                }
            });

            // Compter les connexions (login) - nécessite un champ lastLogin dans votre modèle
            const loggedInCount = await userModel.countDocuments({
                lastLogin: {
                    $gte: dayStart,
                    $lt: dayEnd
                }
            });

            result[weekDays[i]] = {
                registered: registeredCount,
                loggedIn: loggedInCount,
                totalClients: registeredCount // ou loggedInCount selon votre besoin
            };
        }

        // Formater les données pour le graphique
        const formattedData = weekDays.map(day => ({
            date: day,
            registered: result[day].registered,
            loggedIn: result[day].loggedIn,
            clients: result[day].totalClients // Compatibilité ascendante
        }));

        res.json({ success: true, data: formattedData });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch weekly client statistics."
        });
    }
};




export {loginUser, registerUser,getTotalUsers,getWeeklyClientStats}