const mongoose = require('mongoose');
const Product = require('./Product.js');

const {Schema} = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: String,
        required: true
    },
    orderOwner: {
        type: String,
        required: true
    },
    orderTotal: {
        type: Number,
        min: 0.01,
        required: true
    },
    products: [Product.schema],
    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;