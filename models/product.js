const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    detail: {
        type: [Schema.Types.ObjectId],
        ref: 'ProductData',
        required: false
    }
});

ProductSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Product', ProductSchema);