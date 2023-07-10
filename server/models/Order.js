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
    address: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    products: [Product.schema],
    orderStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    orderType: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;