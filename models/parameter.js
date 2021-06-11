const { Schema, model } = require('mongoose');

const ParameterSchema = Schema({
    name: {
        type: String,
        required: true
    },
    name_parameter: {
        type: String,
        required: true
    },
    is_file: {
        type: Boolean,
        default: false
    },
    is_catalog: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true
    }
});

ParameterSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Parameter', ParameterSchema);