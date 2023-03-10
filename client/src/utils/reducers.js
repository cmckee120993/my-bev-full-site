import { useReducer } from 'react';

import {
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product],
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action.name === product.name) {
                        product.purchaseQuantity = action.purchaseQuantity
                    }
                    return product
                })
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product.name !== action.name;
            });

            return {
                ...state, 
                cartOpen: newState.length > 0,
                cart: newState
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
        
        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
};