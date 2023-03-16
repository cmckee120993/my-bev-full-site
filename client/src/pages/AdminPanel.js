import React from 'react';
import '../styles/AdminPanel.css'
import DeliveredOrders from '../components/deliveredOrders';

function AdminPanel() {
    // const { data } = useQuery(QUERY_ORDERS);
    // const {data} = useQuery(QUERY_STATUS_TRUE);
    // const {falseData} = useQuery(QUERY_STATUS_FALSE);

    // let orders;
    // if(data) {
    //     orders = data.orders;
    // };

    // // console.log(orders);

    // let trueOrders;
    // if(data) {
    //     trueOrders = data.orderStatusTrue;
    // }

    // console.log(trueOrders);

    // let falseOrders;
    // if(falseData) {
    //     falseOrders = falseData.orders;
//     }
//     const [updateOrderStatus] = useMutation(UPDATE_STATUS);
   

//     function orderStatus(order) {
        
//         if(order.orderStatus === true) {
//             return(
//                 <>
//                     <li className='delivery-status' style={{background: 'green'}}>Delivery Status: Delivered</li>
//                     <button className='order-change-button' orderId={order._id} onClick={falseStatus}>Change Order Status</button>
//                 </>
//             )
//         } else {
//             return (
//                 <>
//                     <li className='delivery-status' style={{background: 'red'}}>Delivery Status: Working on it!</li>
//                     <button className='order-change-button' orderId={order._id} onClick={trueStatus}>Change Order Status</button>
//                 </>
//             )
//         }
//     };
//     const trueStatus= (event) => {
//         let orderBtn = event.target;
//         let orderId = orderBtn.getAttribute('orderid');
//        updateOrderStatus ( {
//             variables: {
//                 id: orderId,
//                 orderStatus: true, 
//             }
//         })
//     };
//     const  falseStatus = (event) => {
//         let orderBtn = event.target;
//         let orderId = orderBtn.getAttribute('orderid');
//        updateOrderStatus ( {
//             variables: {
//                 id: orderId,
//                 orderStatus: false, 
//             }
//         })
//     };
//     function titleCase(str) {
//         str = str.toLowerCase().split(' ');
//   for (var i = 0; i < str.length; i++) {
//     str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
//   }
//   let productName= str.join(' ');
  
//   return (
//     <>
//         <li>{productName}</li>
//     </>
//   )
// };

//     function deliveryDateChange(date) {
//       let delivDate = date.split('-');
//       let fixedDate = delivDate[1] + '/' + delivDate[2] + '/' + delivDate[0]
//       return (
//         <>
//             <li>Delivery Date: {fixedDate}</li>
//         </>
//       )
//     }

    // function toggle() {
    //     var checkbox = document.querySelector('input[type="checkbox"]');

    // checkbox.addEventListener('change', function () {
    //     if (checkbox.checked) {
    //     // do this
    //     undelivered;
    //     console.log('Checked');
    //     } else {
    //     // do that
    //     console.log('Not checked');
    //     }
    // });
    // };


    return(
        <>
            <h2 className='admin-title'>Beverage Express Admin Panel</h2>
            <h3 className='all-orders'>Delivery Orders</h3>
            
            {/* <div className='admin-orders'>
            <div className='switch-div'>
                    <p>Delivered</p>
                    <label class='switch'>
                        <input type='checkbox'></input>
                        <span class='slider round'></span>
                    </label>
                    <p>Undelivered</p>
                </div>
                {orders ? (
                    <>
                   
                        {orders.map((order) => (
                            <div className='admin-order-div'>
                                <ul>
                                    <li>Order Owner: {order.orderOwner}</li>
                                    <li>Order Placed On: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</li>
                                    {deliveryDateChange(order.deliveryDate)}
                                    {orderStatus(order)}
                                    <li>Order Total {order.orderTotal}</li>
                                    <li>Products:</li>
                                        {order.products.map(({ name ,price, quantity}, index) => (
                                            <ul>
                                                {titleCase(name)}
                                                <ul>
                                                    <li>Price: ${price}</li>
                                                    <li>Quantity: {quantity}</li>
                                                </ul>
                                            </ul>
                                        ))}
                                </ul>
                            </div> 
                            
                        ))}
                       
                    </>
                ): null}
            </div> */}
        </>
    )
}

export default AdminPanel;