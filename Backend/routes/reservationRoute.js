import express from 'express';
import {
    createReservation, deleteReservation,
    getAllReservations,
    getMyReservations, getReservationCount,
    updateReservation
} from '../controllers/reservationController.js';
import authMiddleware from "../middleware/auth.js";

const reservationRouter = express.Router();

// POST /api/reservation
reservationRouter.post('/add', authMiddleware,createReservation);
reservationRouter.get('/getReservation', getAllReservations);
reservationRouter.get('/getMyReservations',authMiddleware, getMyReservations);
reservationRouter.put('/updateReservation/:id',authMiddleware, updateReservation);
reservationRouter.delete('/delete/:id', authMiddleware, deleteReservation);
reservationRouter.get('/count', getReservationCount);


export default reservationRouter;
