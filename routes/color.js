const { Router } = require('express');
const { getColors, createColor, updateColor } = require('../controllers/color');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', validateJWT, getColors);
router.post('/', validateJWT, createColor);
router.put('/', validateJWT, updateColor);

module.exports = router;