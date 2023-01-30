import React from 'react'
import Cart from '../Cart';

// styling and images
import './style.css'
import headerImage from '../../assets/images/bev-exp-header.webp';
import beerLogo from '../../assets/images/bev-exp-logo.webp';
function Header() {
    return (
        <>
            <div className='header-title'>
                {/* Bev Exp Name Logo */}
            <div className='header-logo'>
                <img 
                    src={beerLogo}
                    alt='Beverage Express Name Beer Logo'
                />
            </div>

            {/* store phone and address */}
            <div className='locale'>
                <a href='tel:7172412337' className='phone-number' target='_blank' rel='noreferrer'>717-241-2337</a>
                <address>1021 Ritner Highway<br></br>
                     Carlisle, PA 17013</address>
            </div>
                <Cart />
            </div>
            <div className='header-border'>
            <img 
                className='header-image'
                src={headerImage}
                alt='"We got a whole lotta beer" with Beverage Express store front.'
            />
            </div>
        </>
    );
};

export default Header;