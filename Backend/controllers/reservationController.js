import reservationModel from '../models/reservationModel.js';

const createReservation = async (req, res) => {
    try {




        const newReservation = new reservationModel({
            name:req.body.name,
            email:req.body.email,
            date:req.body.date,
            time:req.body.time,
            guests:req.body.guests,
            specialRequests:req.body.specialRequests,
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
export {createReservation,getAllReservations};