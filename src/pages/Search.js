// react, state, and axios for API results and request
import React, { useState } from 'react';
import axios from 'axios';

// cards of items for search result
import { Card } from 'semantic-ui-react';

// page styling and images
import '../styles/Search.css';
import sixPack from '../assets/images/bx-six-pack.webp';

// placeholder image until database is updated
import bottle from '../assets/images/bx-beer-bottle.webp';

function Search() {
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
                console.log(response);
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
                        // let price = item.CaseRetail;
                        // let name = item.Description;
                        // let packPrice = item.Retail;
                        // let itemSize = item.Size;
                        return (
                            <Card className="card">
                                <Card.Content>
                                     <Card.Header className="beer-name">
                                        <img
                                        src={bottle}
                                        alt="Beer Placeholder"
                                        className="beer-placeholder"
                                        />
                                        <h2>{item.Description}</h2>
                                    </Card.Header>
                                    <Card.Description className="beer-details">
                                        <p>Case: ${item.CaseRetail}</p>
                                        <p>{item.Size}: ${item.Retail}</p>
                                        <p>Stock: {item.QuantityAvailable}</p>
                                        <p>{item.Category}</p>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        );
                    })}
                </Card.Group>
            </div>
            <p className='slushy-products'>To see a list of our current slushy flavors, please go to our <a href='/slushies' className='internal-link'>Slushies Page</a>.</p>
        </>
    )
};

export default Search;