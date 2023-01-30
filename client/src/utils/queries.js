import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query getUserData {
  user {
    _id
    firstName
    lastName
    email
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
    }
  }
}
`
