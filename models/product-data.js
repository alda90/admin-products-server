const { Schema, model } = require('mongoose');

const ProductDataSchema = Schema({
    value: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El id del producto es un campo obligatorio ']
    },
    parameter: {
        type: Schema.Types.ObjectId,
        ref: 'Parameter',
        required: [true, 'El id del parametro es un campo obligatorio ']
    }
});

ProductDataSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('ProductData', ProductDataSchema);