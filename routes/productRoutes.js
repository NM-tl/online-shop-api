const express = require('express');
const multer = require('multer');
const { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    uploadImage, 
    uploadVideo, 
    getImage, 
    getVideo 
} = require('../controllers/productController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/products', getAllProducts);
router.get('/products/:productId', getProductById);
router.post('/product', createProduct);
router.post('/product/:productId/images/upload', upload.single('image'), uploadImage);
router.post('/product/:productId/video/upload', upload.single('video'), uploadVideo);
router.get('/product/image/:fileName', getImage);
router.get('/product/video/:fileName', getVideo);

module.exports = router;
