import { gql } from '@apollo/client';
// keep
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

export const QUERY_ORDER_AND_USER = gql`
query userAndOrder($id: ID!) {
  order(_id: $id) {
    _id
    address
    deliveryDate
    orderOwner
    orderStatus
    orderTotal
    orderType
    phoneNumber
    products {
      name
      price
      quantity
    }
    purchaseDate
  }
  user {
    admin
  }
}
`

export const QUERY_ORDERS_AND_USER = gql`
query usersAndOrders {
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
`

export const QUERY_SEARCH_ORDERS_ALL_ORDERS = gql`
query OrderSearch($phoneNumber: String, $orderOwner: String, $id: ID, $orderStatus: Boolean) {
  orderSearch(phoneNumber: $phoneNumber, orderOwner: $orderOwner, _id: $id, orderStatus: $orderStatus) {
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
`

export const QUERY_SEARCH_PARAMS = gql`
query OrderSearchParamsquery($phoneNumber: String, $id: ID, $orderOwner: String, $orderStatus: String) {
  orderSearch(phoneNumber: $phoneNumber, _id: $id, orderOwner: $orderOwner, orderStatus: $orderStatus) {
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
  user {
    admin
  }
}
`

export const QUERY_USER_ORDERS = gql`
query userOrderQuery($orderStatus: Boolean) {
  userOrderSearch(orderStatus: $orderStatus) {
    _id
    orderOwner
    orderStatus
  }
}
`
// keep
export const QUERY_USER_ORDER_STATUS =gql`
  query userOrderQueryStatus($orderStatus: Boolean) {
  userOrderSearch(orderStatus: $orderStatus) {
    _id
    address
    orderOwner
    orderStatus
    deliveryDate
    orderTotal
    orderType
    purchaseDate
    products {
      name
      price
      quantity
    }
    phoneNumber
  }
}
`