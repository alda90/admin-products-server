const Product = require('../models/product');
const ProductData = require('../models/product-data');
const Parameter = require('../models/parameter');

const getProducts = async (req, res = response) => {

    const q = req.params.q;

    try {
        const products = await ProductData.aggregate([
            { $match: { value: { '$regex': '.*'+q+'.*', $options: 'i' }  } },
            { $group: { _id: '$product', value: { '$first': '$value' }, parameter: { '$first': '$parameter' } } },
            { $lookup: {from: 'parameters', localField: 'parameter', foreignField: '_id', as: 'parameter'} }
         ]);

        res.json({
            success: true,
            products      
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getDetailProduct = async (req, res = response) => {
    const product_id = req.params.id;

    try {
        const detail = await ProductData.find({ product: product_id }).populate('parameter').lean();

        res.json({
            success: true,
            detail
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}


const createProduct = async (req, res = response) => {
    
    try {

        const product = new Product();

        await product.save();
        
        const parameters = await Parameter.find().select('name_parameter _id');
        
        await iterateParameters(req, res, parameters, product.id);

        const detail = await ProductData.find({ product: product.id }).populate('parameter').lean();

        res.json({
            success: true,
            product_id: product.id,
            detail
        });
       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
    
}

const iterateParameters = async (req, res, parameters, product_id) => {

    for (let index = 0; index < parameters.length; index++) {
        
        const parameter = parameters[index];
        if (req.body[parameter['name_parameter']]) {

            const data = req.body[parameter['name_parameter']];
            await createDataProduct(res, data, product_id, parameter['_id'] );
        } else {
            await createDataProduct(res, 'null', product_id, parameter['_id']);
        }
        
      }
    // parameters.forEach(async element => {
          
    //     const data = req.body[element['name_parameter']];
    //     await createDataProduct(res, data, product, element['_id'] );

    // });
}



const createDataProduct = async (res, value, product_id, parameter ) => {

    try {
        const productData = new ProductData();
        productData.value = value;
        productData.product = product_id;
        productData.parameter = parameter;

        await productData.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
    
}

const updateImageDataProduct = async (req, res = response) => {

    const { id, photo } = req.body;

    try {

        const productData = await ProductData.findById(id);
        productData.value = photo;
        await productData.save();

        const detail = await ProductData.find({ product: productData.product }).populate('parameter').lean();

        res.json({
            success: true,
            detail
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getDetailProduct,
    updateImageDataProduct
}