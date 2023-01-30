const mongoose = require('mongoose');

const {Schema} = mongoose;

const productSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 