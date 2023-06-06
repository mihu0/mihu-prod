import express from 'express';
const router = express.Router();
import { getProducts, productById, updateProduct, addProduct, deleteProduct, productsCategoryWise, addMultipleProducts, getNumImages, getBrands, getCategories, productsBrandWise, getRandomProducts, searchProducts } from '../controllers/productController.js';
import upload from '../service/imgae.js'
router.get('/getProducts', getProducts);
router.get('/getCategories',getCategories);
router.get('/getBrands',getBrands);
router.get('/getNumImages', getNumImages);
router.get('/random', getRandomProducts);


router.put('/updateProduct', updateProduct);
router.post('/addProduct', upload.single('file'), addProduct);
router.delete('/deleteProduct', deleteProduct);
router.post('/productsCategoryWise', productsCategoryWise);
router.post('/productsBrandWise', productsBrandWise);
router.post('/searchProducts', searchProducts);

router.post('/productById', productById);
router.post('/addMultipleProducts',addMultipleProducts);



export default router;