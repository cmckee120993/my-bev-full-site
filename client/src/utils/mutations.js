import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    token
  }
}
`;

export const ADD_ORDER = gql`
  mutation addOrder(
  $orderOwner: String!, $deliveryDate: String!, $orderTotal: Float!, $orderStatus: Boolean!, $products: [ProductInput]!) {
  addOrder(orderOwner: $orderOwner, deliveryDate: $deliveryDate, orderTotal: $orderTotal, orderStatus: $orderStatus, products: $products) {
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
`;

export const UPDATE_STATUS = gql`
  mutation updateOrderStatus($id: ID!, $orderStatus: Boolean) {
  updateOrderStatus(_id: $id, orderStatus: $orderStatus) {
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
`

