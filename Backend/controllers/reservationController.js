import reservationModel from '../models/reservationModel.js';

const createReservation = async (req, res) => {

    try {
        if (!req.userId) {
            return res.json({success: false, message: "Login First"});
        }
        const newReservation = new reservationModel({
            name:req.body.name,
            email:req.body.email,
            date:req.body.date,
            time:req.body.time,
            guests:req.body.guests,
            specialRequests:req.body.specialRequests,
            userId : req.userId
        });

        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);
    } catch (error) {
        console.error('Reservation Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.find();
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getMyReservations = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Login first" });
        }
        const reservations = await reservationModel.find({userId:req.userId});
        res.json({success:true,data:reservations})
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.json({success:false,message:"Error"})
    }
}
const updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const reservation = await reservationModel.findOne({ _id: reservationId, userId: req.userId });

        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }

        const updatedData = {
            date: req.body.date,
            time: req.body.time,
            guests: req.body.guests,
            specialRequests: req.body.specialRequests,
        };

        const updatedReservation = await reservationModel.findByIdAndUpdate(reservationId, updatedData, {
            new: true,
        });

        res.status(200).json({ success: true, data: updatedReservation });
    } catch (error) {
        console.error("Error updating reservation:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const reservation = await reservationModel.findOne({ _id: reservationId, userId: req.userId });

        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }

        await reservationModel.findByIdAndDelete(reservationId);

        res.status(200).json({ success: true, message: "Reservation deleted successfully" });
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export {createReservation,getAllReservations,getMyReservations,updateReservation,deleteReservation};