import React from 'react';

// Imports from utils
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import './style.css';

const CartItem = ({ item }) => {
    const [, dispatch] = useStoreContext();

    const removeFromCart = item => {
        dispatch({
            type:REMOVE_FROM_CART,
            name: item.name
        });
        idbPromise('cart', 'delete', { ...item });
    };

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                name: item.name
            });
            idbPromise('cart', 'delete', { ...item });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                name: item.name,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    }

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  let productName= str.join(' ');
  
  return (
    <>
        <h2 key={productName}>{productName}</h2>
    </>
  )
};

    return (
        <div className='item-div'>
            <div className='name-div'>
                {titleCase(item.name)}
            </div>
            <div>
                <p className='cart-price'>${item.price}</p>
            </div>
            <div className='quantity-div'>
                <span>Qty:</span>
                <input
                    type='number'
                    placeholder='1'
                    value={item.purchaseQuantity}
                    onChange={onChange}
                    />
                    <button className="button" onClick={() => removeFromCart(item)}>Delete</button>
            </div>
        </div>
    );
};

export default CartItem;