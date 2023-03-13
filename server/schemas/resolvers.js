const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: 
	{
	
		orders: async () => {
			return Order.find({});
		},

		order: async (parent, { _id }, context) => {
				return await Order.findById(_id).populate('products');
		}, 

		user: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById({_id: context.user._id})
				.populate('orders');
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

		updateOrderStatus: async (parent, {_id, orderStatus}) => {
			const order = await Order.findByIdAndUpdate(_id, {$set: {orderStatus: orderStatus} });
			return order;
		},
	},
};

module.exports = resolvers;