const Color = require('../models/color');

const getColors = async (req, res = response) => {
    const colors = await Color.find().lean();

    res.json({
        success: true,
        colors
    });
}

const createColor = async (req, res = response) => {

    try {
        const color = new Color(req.body);

        await color.save();

        res.json({
            success: true,
            color
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateColor = async (req, res = response) => {

    const { id, name, code } = req.body;

    try {
        const color = await Color.findById(id);
        color.name = name;
        color.code = code;
        
        await color.save();

        res.json({
            success: true,
            color
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

module.exports = {
    getColors,
    createColor,
    updateColor
}