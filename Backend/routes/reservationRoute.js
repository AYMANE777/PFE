import express from 'express';
import { createReservation } from '../controllers/reservationController.js';

const reservationRouter = express.Router();

// POST /api/reservation
reservationRouter.post('/add', createReservation);

export default reservationRouter;
