const { Router } = require('express');
const { createProduct, getProducts, getDetailProduct, updateImageDataProduct } = require('../controllers/product');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/:q', validateJWT, getProducts);
router.get('/detail/:id', validateJWT, getDetailProduct);
router.post('/', validateJWT, createProduct);
router.post('/image', validateJWT, updateImageDataProduct )
//router.put('/', validateJWT, updateParameter);

module.exports = router;