import React from 'react';
import '../../styles/AdminPanel.css';
import {useQuery, useLazyQuery} from '@apollo/client';
import {QUERY_ORDERS_AND_USER, QUERY_SEARCH_PARAMS} from '../../utils/queries';
import sixPack from  '../../assets/images/bx-six-pack.webp';
import OrderCard from '../../components/OrderCard';

function AdminPanelMaster() {

    const {loading: allLoading, data: allData, error: allError} = useQuery(QUERY_ORDERS_AND_USER);
    const [searchOrders, { data: searchData, loading: searchLoading, error: searchError }] = useLazyQuery(QUERY_SEARCH_PARAMS);

let orderSearch;
let allOrders;
let admin;

if(allData) {
    allOrders = allData.orders;
    admin = allData.user;
}

if(searchData) {
    admin = searchData.user;
    orderSearch = searchData.orderSearch;
}

console.log(orderSearch);
console.log(searchData);
console.log(orderSearch);
console.log(allOrders);
console.log(admin);



 function onlyLetters(str) {
    var letters = /^[A-Za-z]+$/;
    var numbers = /^[0-9]+$/;
    var numbAndLet = /^[A-Za-z0-9]+$/;
    if (str.match(letters)) {
        console.log(str);
        searchOrders({ variables: { orderOwner: `${str}`}});
    } else if (str.match(numbers)) {
        console.log('numbers')
    } else if (str.match(numbAndLet)) {
        console.log('combo deal baby')
    }
 };

function searchQuery() {
    let searchInput = document.querySelector('.order-search-input').value;
    onlyLetters(searchInput.trim());
    console.log(searchInput);
};

function initOrderData() {
        if(searchLoading || allLoading) {
            return (
                <>
                    <p>Loading...</p>
                </>
            )
        } if (orderSearch && admin.admin) {
            return (
                <>
                <div className='admin-orders'>  
        {orderSearch ? (
            <>   
                {orderSearch.map((order) => (
                    <OrderCard order={order}></OrderCard>
                ))} 
            </>
        ): null}
    </div>
                </>
            )
        } 
        if (!orderSearch && admin.admin) {
           
            return (
                <>
                <div className='admin-orders'>  
        {allOrders ? (
            <>   
                {allOrders.map((order) => (
                    <OrderCard order={order}></OrderCard>
                ))} 
            </>
        ): null}
    </div>
                </>
            )
        };
    }
  
return (
    <>
    <div className="title-div">
                    <h2 className="title">Admin Panel</h2>
                        <img
                            loading='lazy'
                            className="title-image"
                            src={sixPack}
                            alt="Beverage Express Six Pack Logo"
                        />
                </div>
    <div className='order-search-div'>
        <input className='order-search-input'></input>
        <button calssName='button' onClick={searchQuery}></button>
    </div>
    {initOrderData()}
 </>
)
};

export default AdminPanelMaster;