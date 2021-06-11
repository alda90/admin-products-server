const { Router } = require('express');
const { getParameters, createParameter, updateParameter } = require('../controllers/parameter');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', validateJWT, getParameters);
router.post('/', validateJWT, createParameter);
router.put('/', validateJWT, updateParameter);

module.exports = router;
