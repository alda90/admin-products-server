const Parameter = require('../models/parameter');

const getParameters = async (req, res = response) => {
    const parameters = await Parameter.find().lean();

    res.json({
        success: true,
        parameters
    });
}

const createParameter = async (req, res = response) => {
    
    try {
        const parameter = new Parameter(req.body);

        await parameter.save();

        res.json({
            success: true,
            parameter
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateParameter = async (req, res = response ) => {
    const { id, name, name_parameter, is_file, is_catalog } = req.body;

    try {
        const parameter = await Parameter.findById(id);
        parameter.name = name;
        parameter.code = code;
        parameter.name_parameter = name_parameter;
        parameter.is_file = is_file;
        parameter.is_catalog = is_catalog;

        await parameter.save();

        res.json({
            success: true,
            parameter
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

module.exports = {
    getParameters,
    createParameter,
    updateParameter
}