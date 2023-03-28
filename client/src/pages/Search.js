// react, state, and axios for API results and request
import React, { useState } from 'react';
import axios from 'axios';

// shopping cart add
import { useStoreContext } from '../utils/GlobalState'
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

// cards of items for search result
import { Card } from 'semantic-ui-react';

// page styling and images
import '../styles/Search.css';
import sixPack from '../assets/images/bx-six-pack.webp';

// placeholder image until database is updated
import bottle from '../assets/images/bx-beer-bottle.webp';

function Search(item) {
    const [APIData, setAPIData] = useState([]);

    const searchItem = function () {
        // accessing user input
        const searchParams = document.querySelector('.search-words').value;
        // fetch request
        const options = {
            method: 'POST',
            url:'https://mpowerapi.azurewebsites.net/api/v1/items/search',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            data: { search: `${searchParams}` },
        };

        axios  
            .request(options)
            .then(function(response) {
                setAPIData(response.data.Results);
            })
            .catch(function(error) {
                console.error(error);
            });
    };

    // allowing search to start by enter key
    const keyDown = function(e) {
        if(e.keyCode === 13) {
            searchItem();
        };
    };

    const [state, dispatch] = useStoreContext();
    const { cart } = state;
    
    const addToCart = (event) => {
     
    let cartButton = event.target;
    let itemName = cartButton.getAttribute('itemname');
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

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  let productName= str.join(' ');
  
  return (
    <>
        <h2>{productName}</h2>
    </>
  )
};

    return (
        <>
            {/* page title */}
            <div className='search-title-div'>
                <h2 className='search-title'>Product Search</h2>
                <img
                    className='search-header-image'
                    src={sixPack}
                    alt='Beverage Express Six Pack Logo'
                />
            </div>

            {/* search bar for user input */}
            <div className="search-div">
                <input
                type="text"
                className="search-words"
                placeholder="Search for our products here..."
                onKeyDown={keyDown}
                >
                </input>
                <button type="submit" className="search-button" onClick={searchItem}>
                Search
                </button>
            </div>

            {/* item cards returned after user search */}
            <div className="card-div">
                <Card.Group className="ui-card-div">
                    {APIData.map((item) => {
                        return (
                            <Card className="card">
                                <Card.Content>
                                     <Card.Header className="beer-name">
                                        <img
                                        src={bottle}
                                        alt="Beer Placeholder"
                                        className="beer-placeholder"
                                        />
                                        {titleCase(item.Description)}
                                    </Card.Header>
                                    <Card.Description className="beer-details">
                                        <p>Case: ${item.CaseRetail}</p>
                                        <p>{item.Size}: ${item.Retail}</p>
                                        <p>Stock: {item.QuantityAvailable}</p>
                                        <p>{item.Category}</p>
                                    </Card.Description>
                                </Card.Content>
                                <button itemname={item.Description} itemprice={item.CaseRetail} onClick={addToCart} className="cart-button">Add to Cart</button>
                            </Card>
                        );
                    })}
                </Card.Group>
            </div>
            <p className='slushy-products'>To see a list of our current slushy flavors, beers on tap, and seasonal beers, please go to our <a href='/seasonal' className='internal-link'>What's On Tap Page</a>.</p>
        </>
    )
};

export default Search;