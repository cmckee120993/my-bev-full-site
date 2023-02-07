import React, { useEffect } from 'react';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../../utils/mutations';
// import { ADD_TO_ORDER } from '../../utils/mutations';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";



const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [addOrder] = useMutation(ADD_ORDER);
    // const [addToOrder] = useMutation(ADD_TO_ORDER);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function sendOrder() {
            const deliveryDate = document.querySelector('.deliv-date').value;
            const orderOwner = document.querySelector('.order-owner').value;
            const orderTotal = parseInt(document.querySelector('.cart-total').textContent);
            const orderTotalFloat = parseFloat(orderTotal)
            console.log(typeof orderTotalFloat)
            const products = [];
            state.cart.forEach((item) => {
                console.log(item);
              products.push({
                    name: item.name,
                    price: parseInt(item.price),
                    quantity: item.purchaseQuantity
              })

        });
        console.log({
            deliveryDate, 
            orderOwner,
            orderTotal,
            products
        })
            addOrder({
                variables: {
                    deliveryDate, 
                    orderOwner,
                    orderTotal,
                    products
                }
                });
        
    console.log(deliveryDate);
    console.log(orderOwner);
    console.log(orderTotal);
   
};
        

       
    if (!state.cartOpen) {
        return (
            <div className="cart-div-closed" onClick={toggleCart}>
                <FontAwesomeIcon className="cart-image" icon={faCartShopping}/>
            </div>
        );
    }

    return (
        <>
            <div style={{backgroundImage: 'radial-gradient(#000C66, #000000)' }} className="cart-div-open">
                <div className="toggle-cart" onClick={toggleCart}>
                    [close]
                </div>
                <h2 className="cart-title">Shopping Cart</h2>
                {state.cart.length ? (
                    <div className="cart-info">
                        {state.cart.map((item) => (
                            <CartItem key={item.name} item={item} />
                        ))}
                    
                    <div className="cart-input-div">
                        <div className="total-div">
                            <label>
                            Total: $
                            </label>
                            <p className='cart-total'>{calculateTotal()}</p>
                        </div>
                        <label>Delivery Date:</label>
                        <input className="deliv-date" type="date"></input>
                        <label>Name:</label>
                        <input className="order-owner" type="text"></input>
                        {Auth.loggedIn() ? (
                            <button className="cart-button" onClick={sendOrder}>Send Order</button>
                        ) : (
                            <span>(log in to check out)</span>
                        )}
                    </div>
                </div>
                ) : (
                    <h3 className="shop-more-warning">
                        You haven't added anything to your cart yet!
                    </h3>
                )}
            </div>
        </>
    );
};

export default Cart;

