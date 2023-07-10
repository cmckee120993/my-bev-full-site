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
      address
      phoneNumber
      orderType
    }
  }
}
`;

export const QUERY_USER_ORDER_TRUE = gql`
query TrueUserOrders {
  trueUserOrders {
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
    address
    phoneNumber
    orderType
  }
}
`

export const QUERY_USER_ORDER_FALSE = gql`
query FalseUserOrders {
  falseUserOrders {
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
    address
    phoneNumber
    orderType
  }
}
`

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
    address
    phoneNumber
    orderType
  }
}`;

export const QUERY_STATUS_FALSE = gql`
query OrderStatusFalse {
  orderStatusFalse {
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
    address
    phoneNumber
    orderType
  }
}`;

export const QUERY_STATUS_TRUE = gql`
query OrderStatusTrue {
  orderStatusTrue {
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
    address
    phoneNumber
    orderType
  }
}
`;