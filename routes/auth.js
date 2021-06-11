const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obliatorio').not().isEmpty(),
    check('password', 'La contraseña es obliatoria').not().isEmpty(),
    check('email', 'El email es obliatorio').isEmail(),
    validateFields
], createUser);

router.post('/', [
    check('password', 'La contraseña es obliatoria').not().isEmpty(),
    check('email', 'El email es obliatorio').isEmail(),
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
