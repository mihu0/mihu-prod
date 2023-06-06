import express from 'express';
const router = express.Router();
import { addToCart,getCart,deleteCart,updateCart} from '../controllers/cartController.js';
router.post('/addToCart', addToCart);
router.get('/getCart', getCart);
router.delete('/deleteCart', deleteCart);
router.put('/updateCart', updateCart);



export default router;