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

    function imageSelector(img) {
        if(img === "") {
            return (
            <img
                loading='lazy'
                src={bottle}
                alt="Beer Placeholder"
                className="beer-placeholder"
                key='beerImg'
            />
            )
        } else {
            return (
            <img
                loading='lazy'
                src={img}
                alt="Beer Placeholder"
                className="beer-img"
                key={img}
            />
            )
        }
    };

    const [state, dispatch] = useStoreContext();
    const { cart } = state;
    
    const addToCart = (event) => {
     
    let cartButton = event.target;
    let itemName = cartButton.getAttribute('itemname');
    let itemPrice = cartButton.getAttribute('itemprice');
    
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
    };


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

function productCard(item) {
    // console.log(item);
    let productType = item.Name;
    let nameArray = productType.split(" ");
    let keg = nameArray.pop();
    if (keg.toString() === "KEG") {
        return(
            <>
            <Card className="card">
                <Card.Content>
                    <Card.Header className="beer-name">
                        {imageSelector(item.Notes)}
                        {titleCase(item.Description)}
                    </Card.Header>
                    <Card.Description className="beer-details">
                        <p key={item.SkuNumber}>Keg Price: ${item.CaseRetail}</p>
                        <p key={item.QuantityAvailable}>Stock: {item.QuantityAvailable}</p>
                        <p key={item.Category}>{item.Category}</p>
                    </Card.Description>
                </Card.Content>
                <button itemname={item.Description} itemprice={item.CaseRetail} onClick={addToCart} className="button">Add to Cart</button>
            </Card>
            </>
        )
    } else {
        return(
            <>
            <Card className="card">
                <Card.Content>
                    <Card.Header className="beer-name">
                        {imageSelector(item.Notes)}
                        {titleCase(item.Description)}
                    </Card.Header>
                    <Card.Description className="beer-details">
                        <p key={item.Description}>Case: ${item.CaseRetail}</p>
                        <p key={item.Retail}>{item.Size}: ${item.Retail}</p>
                        <p key={item.QuantityAvailable}>Stock: {item.QuantityAvailable}</p>
                        <p key={item.Category}>{item.Category}</p>
                    </Card.Description>
                </Card.Content>
                <button itemname={item.Description} itemprice={item.CaseRetail} onClick={addToCart} className="button">Add to Cart</button>
            </Card>
            </>
        )
    }
}

    return (
        <>
            {/* page title */}
            <div className='search-title-div'>
                <h2 className='search-title'>Product Search</h2>
                <img
                    loading='lazy'
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
                <button type="submit" className="button" onClick={searchItem}>
                Search
                </button>
            </div>

            {/* item cards returned after user search */}
            <div className="card-div">
                <Card.Group className="ui-card-div">
                    {APIData.map((item) => {
                        return (
                            <>
                                {productCard(item)}
                            </>
                        );
                    })}
                </Card.Group>
            </div>
            <p className='page-description'>Use this search bar to browse the Beverage Express catalogue to see if we have your favorite products in stock. 
                With Carlisle's biggest selection of imported, domestic, and craft brews, this search can help you check to see if
                we have a product in stock or if it's available from our wholesale distributors. Don't forget, you can always &nbsp; 
                <a className='link' href='tel:7172412337' rel='noreferrer' target='_blank'>call us</a> with any questions you may have.
            </p>
            
            <a href='/seasonal' className='link'><p className='button to-page'>To see a list of our current slushy flavors, beers on tap, and seasonal beers, please go to our What's On Tap Page.</p></a>
        </>
    )
};

export default Search;