const { Response, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const existsEmail = await User.findOne({email});
        if (existsEmail) {
            return res.status(400).json({
                success: false,
                message: 'El email ya existe'
            });
        }

        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id);

        res.json({
            success: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const userBD = await User.findOne({email});
        if(!userBD) {
            return res.status(400).json({
                success: false,
                message: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, userBD.password);
        if(!validPassword) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña es invalida'
            });
        }

        const token = await generateJWT(userBD.id);
        return res.json({
            success: true,
            user: userBD,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        success: true,
        user,
        token
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}