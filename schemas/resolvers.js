const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe =require('stripe')('pk_test_51MEq6CFWXFK5U75ZexkNlDZ7FbeNBjUQutlMmE5qu4Nv61d5lMsh2OR441vtErI3a1UDxgbocc9KWU4tWgE91nH500DGaFrWuq');

const resolvers = {
	Query: 
	{
	// For future development of administrator site
		orders: async () => {
			return Order.find({});
		},

		order: async (parent, { _id }, context) => {
			if (context.user) {
				return await Order.findById(_id).populate('products');
			}
			throw new AuthenticationError('Not logged in.')
		}, 
	// For current client-side site
		user: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById({_id: context.user._id})
				.populate('orders');
				console.log(user);
				return user;
			}
			throw new AuthenticationError('Not logged in');
		},

	},

	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},

		updateUser: async (parent, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, {new: true});
			}
			throw new AuthenticationError('Not logged in');
		},
		
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError('Incorrect information');
			}
			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new AuthenticationError('Incorrect information');
			}
			const token = signToken(user);
			return { token, user };
		},
		
		addOrder: async (parent, args, context) => {
			if(context.user) {
			const order = await Order.create(args);
			const test = await User.findByIdAndUpdate(context.user._id, { $push: { orders: order._id } }, {new: true});
			return order;
			}

		throw new AuthenticationError('Not logged in');
		},

		addToOrder: async (parent, { orderId, name, price, purchaseQuantity }, context) => {
			if(context.user) {
				const product = Product.create(name, price, purchaseQuantity);
				const order = await Order.findByIdAndUpdate(orderId, { $push: product});
				return order;
			}
		}
	},
};

module.exports = resolvers;