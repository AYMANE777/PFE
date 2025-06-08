import express from 'express';
import { createReservation, getAllReservations } from '../controllers/reservationController.js';

const reservationRouter = express.Router();

// POST /api/reservation
reservationRouter.post('/add', createReservation);
reservationRouter.get('/getReservation', getAllReservations);

export default reservationRouter;
