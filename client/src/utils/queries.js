import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query getUserData {
    user {
    _id
    firstName
    lastName
    email
    admin
    orders {
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
      orderStatus
      }
    }
  }
`;

export const QUERY_ORDERS = gql`
query Orders {
  orders {
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
    orderStatus
  }
}`