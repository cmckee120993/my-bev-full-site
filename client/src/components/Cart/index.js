import React, {useEffect } from 'react';
import { useMutation } from '@apollo/client';

// Imports from utils
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART } from '../../utils/actions';
import Auth from '../../utils/auth';
import { idbPromise } from '../../utils/helpers';
import { ADD_ORDER } from '../../utils/mutations';

// Imports from components
import CartItem from '../CartItem';
import Calendar from '../Calendar';

// Import styles and images
import './style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {

    // Cart and Mutations
    const [state, dispatch] = useStoreContext();
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({  products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    // Cart total function
    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    // Send order from cart to database
    function sendOrder() {
        const deliveryDate = document.querySelector('.date-picker').value;
        console.log(deliveryDate)
        const orderOwner = document.querySelector('.order-owner').value;
        const orderTotal = parseFloat(document.querySelector('.cart-total').textContent);
        const orderStatus = false;
        const products = [];
        state.cart.forEach((item) => {
            products.push({
                name: item.name,
                price: parseFloat(item.price),
                quantity: item.purchaseQuantity
            })
        });
        addOrder({
            variables: {
                deliveryDate, 
                orderOwner,
                orderTotal,
                products,
                orderStatus
            }
        });
        document.location.href = '/customerpanel';     
    };


let calendar = document.querySelector('deliv-date');
console.log(calendar);
    if (!state.cartOpen) {
        return (
            <div className="cart-div-closed" onClick={toggleCart}>
                <FontAwesomeIcon className="cart-image" icon={faCartShopping} />
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
                        <Calendar />
                        {/* <input className="deliv-date" type="date"></input> */}
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
                        You haven't added anything to your cart yet! Get <a href='/search' className='internal-link'>shopping</a>!
                    </h3>
                )}
            </div>
        </>
    );
};

export default Cart;

