const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Product {
    name: String
    price: Float
    quantity: Int
  }

  input ProductInput {
    name: String
    price: Float
    quantity: Int
  }

  type Order {
    _id: ID
    purchaseDate: String
    deliveryDate: String
    orderOwner: String
    products: [Product]
    orderTotal: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    orders: [Order]
    order(_id: ID!): Order
    user: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(orderOwner: String!, deliveryDate: String!, orderTotal: Float!, products: [ProductInput]!): Order
    addToOrder(orderId: ID!, name: String!, price: Int!, purchaseQuantity: Int!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;


// addOrder(orderOwner: String!, deliveryDate: String!, orderTotal: Float!): Order