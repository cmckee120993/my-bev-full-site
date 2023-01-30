import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER =gql`
mutation updateUser ($firstName: String, $lastName: String, $email: String, $password: String) {
  updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    _id
    firstName
    lastName
    email
  }
}
`

export const ADD_USER = gql`
    mutation addUser (
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
        ) {
        addUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ) {
            token
            user {
             _id
            }
        }
    }
`;

export const ADD_ORDER = gql`
mutation addOrder ($orderOwner: String!, $deliveryDate: String!, $orderTotal: Float!, $products: [ProductInput]!) {
  addOrder(orderOwner: $orderOwner, deliveryDate: $deliveryDate, orderTotal: $orderTotal, products: $products) {
    _id
    purchaseDate
    deliveryDate
    orderOwner
    products {
      name
      price
      quantity
    }
    orderTotal
  }
}
`;


// export const ADD_TO_ORDER = gql`
// mutation AddToOrder($orderId: ID!, $name: String!, $price: Int!, $purchaseQuantity: Int!) {
//   addToOrder(orderId: $orderId, name: $name, price: $price, purchaseQuantity: $purchaseQuantity) {
//     _id
//     purchaseDate
//     deliveryDate
//     orderOwner
//     products {
//       name
//       price
//       quantity
//     }
//     orderTotal
//   }
// }
// `
