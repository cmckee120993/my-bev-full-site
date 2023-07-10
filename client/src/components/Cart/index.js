import React, {useEffect } from 'react';
import { useMutation } from '@apollo/client';

// Imports from utils
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART } from '../../utils/actions';
import Auth from '../../utils/auth';
import { idbPromise } from '../../utils/helpers';
import { ADD_ORDER } from '../../utils/mutations';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

// Imports from components
import CartItem from '../CartItem';
import Calendar from '../Calendar';
// import AutoComplete from '../AddressFormComp';

// Import styles and images
import './style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {

    
      // Cart and Mutations
      const [state, dispatch] = useStoreContext();
      const [addOrder] = useMutation(ADD_ORDER);
      const { cart } = state;

    const addToCart = (event) => {
        let item;
        let cartButton = event.target;
        let itemName = cartButton.getAttribute('itemName');
        let itemPrice = cartButton.getAttribute('itemPrice');
        
          const itemInCart = cart.find((cartItem) => cartItem.name === itemName)
          if(itemInCart) {
            dispatch({
              type: UPDATE_CART_QUANTITY,
              name: itemName,
              purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise ('cart', 'put', {
              ...itemInCart,
              purchaseQuantity: parseInt(itemInCart.purchaseQuantity) +1
            });
          } else {
            dispatch({
              type: ADD_TO_CART,
              product: { name: itemName, price: itemPrice,  purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1});
          }
        }

  

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

    function deliverMethod() {

        let deliv = document.querySelector('.switch-input').checked;
        let delivDiv = document.querySelector('.deliv-method-div');
        if (deliv === false) {
            
            delivDiv.innerHTML =
                `<div className='method-div' value='Delivery'>
                        <label>Address:</label>
                        <input className="address" type="text"></input>
                        </div>`
            
        } if (deliv === true) {

            delivDiv.innerHTML =
                `
                <div className='method-div' value='Pickup'>
                       </div>`
        }
    };


    // Send order from cart to database
    function sendOrder() {
        const deliveryDate = document.querySelector('.date-picker').value;
        const orderOwner = document.querySelector('.order-owner').value;
        const orderTotal = parseFloat(document.querySelector('.cart-total').textContent);
        const orderStatus = false;
        let addressInput = document.querySelector('.address').value;
        let address; 
        if (address) {
            address = addressInput;
        } else {
            address = "Pickup";
        }
        const phoneNumber = document.querySelector('.phone').value;
        const deliv = document.querySelector('.method-div');
       let orderType = deliv.getAttribute('value');
       console.log("hello");
       console.log(orderOwner);
        console.log(deliveryDate);
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
                orderStatus,
                address,
                phoneNumber,
                orderType
            }
        });
        // document.location.href = '/customerpanel';     
    };

    if (!state.cartOpen) {
        return (
            <div className="cart-div-closed" onClick={toggleCart}>
                <FontAwesomeIcon className="cart-image" icon={faCartShopping} />
            </div>
        );
    }
    
    function addOn() {
        let itemTypeArray = [];
        state.cart.forEach((item) => {
            let itemName = item.name;
        let itemSplit = itemName.split(' ')
        let itemLength = itemSplit.length-1;
        
        itemTypeArray.push(itemSplit[itemLength]);
       
        })
        
        if(itemTypeArray.includes('KEG')) {
            return (
                <>
                <div className='addons'>
                        <p>Would you like to add any of these to your order?</p>
                        <div className='product-addon'>
                            <p>Tap Rental & Deposit</p>
                            <p>$31.00</p>
                            <button itemName='Tap Rental & Deposit' itemPrice='31.00' onClick={addToCart} className="cart-button">Add to Cart</button>
                        </div>
                        <div className='product-addon'>
                            <p>Tub Rental & Deposit</p>
                            <p>$21.00</p>
                            <button itemName='Tub Rental & Deposit' itemPrice='21.00' onClick={addToCart} className="cart-button">Add to Cart</button>
                        </div>
                        <div className='product-addon'>
                        <p>Ice (20lb.)</p>
                        <p>$5.00</p>
                        <button itemName='Ice (20lbs.)' itemPrice='5.00' onClick={addToCart} className="cart-button">Add to Cart</button>
                    </div>
                    <div className='product-addon'>
                        <p id='name'>Ice (8lb.)</p>
                        <p id='price'>$2.50</p>
                        <button itemName='Ice (8lbs.)' itemPrice='2.50' onClick={addToCart} className="cart-button">Add to Cart</button>
                    </div>
                    </div>
                
                </>
            )
        } else {
            return(
                <>
                    <div className='product-addon'>
                        <p>Ice (20lb.)</p>
                        <p>$5.00</p>
                        <button itemName='Ice (20lbs.)' itemPrice='5.00' onClick={addToCart} className="cart-button">Add to Cart</button>
                    </div>
                    <div className='product-addon'>
                        <p id='name'>Ice (8lb.)</p>
                        <p id='price'>$2.50</p>
                        <button itemName='Ice (8lbs.)' itemPrice='2.50' onClick={addToCart} className="cart-button">Add to Cart</button>
                    </div>
                </>
            )
        }
    };

    return (
        <>
            <div style={{backgroundImage: 'radial-gradient(#000C66, #000000)' }} className="cart-div-open">
                <div className="toggle-cart" onClick={toggleCart}>
                    [close]
                </div>
                <h2 className="cart-title">Shopping Cart</h2>
                {state.cart.length ? (
                    <div className="cart-info">
                        {state.cart.map((item) => {
                            return(
                                <>
                            <CartItem key={item.name} item={item} />
                            
                            </>
                            )
                        })}
                        {addOn()}
                    <div className="cart-input-div">
                        <div className="total-div">
                            <label>
                            Total: $
                            </label>
                            <p className='cart-total'>{calculateTotal()}</p>
                        </div>
                        <div className='slider-div'>
                        <p>Delivery</p>
                        <label class="switch">
                            <input className='switch-input' type="checkbox" value='delivery' onClick={deliverMethod}/>
                            <span class="slider round"></span>  
                        </label>
                        <p>Pickup</p>
                        </div>
                        <label>Delivery Date:</label>
                        <Calendar />
                        <label>Name:</label>
                        <input className="order-owner" type="text"></input>
                        <label>Phone Number:</label>
                        <input className="phone" type="text"></input>
                        <div className='deliv-method-div'>
                        <div className='method-div' value='Delivery'>
                        <label>Address:</label>
                        <input className="address" type="text"></input>
                        </div>
                        </div>
                        
                        {/* <AutoComplete /> */}
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

