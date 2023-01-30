import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

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

    return (
        <div>
            <div>
                {item.name}
            </div>
            <div>
                {item.price}
            </div>
            <div>
                <span>Qty:</span>
                <input
                    type='number'
                    placeholder='1'
                    value={item.purchaseQuantity}
                    onChange={onChange}
                    />
                    <button className="cart-button" onClick={() => removeFromCart(item)}>Delete</button>
            </div>
        </div>
    );
};

export default CartItem;