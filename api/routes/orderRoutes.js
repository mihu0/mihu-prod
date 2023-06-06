import express from 'express';
const router = express.Router();
import { stripePayment } from '../controllers/orderController.js';


router.post("/order",stripePayment);

export default router;
