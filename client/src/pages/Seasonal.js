import React from 'react';

import '../styles/Seasonal.css';
import sixPack from '../assets/images/bx-six-pack.webp';

function Seasonal() {
    return(
        <>
            <div className='title-div'>
                        <h2 className='title'>What's On Tap?</h2>
                        <img
                            loading='lazy'
                            className='title-image'
                            src={sixPack}
                            alt='Beverage Express Six Pack Logo'
                            
                        />
            </div>

            <p className='page-description'>
                In order for Beverage Express to keep boasting the biggest selection of beer in Carlisle, PA, we are constantly
                evolving and bringing in new products. This is a list of our rotating slushies and most recent products brought into the store including
                seasonal beers, local brews, and new products available to us from our wholesaler. You can also keep a look out for 
                new products on our social media: <a href="https://www.facebook.com/wholelottabeer/" alt='Link to Beverage Express Facebook' rel='noreferrer' target="_blank" className='link'>
                Facebook</a>, <a alt='Link to Beverage Express Instagram' href="https://www.instagram.com/bevexcarlisle/" rel='noreferrer' target="_blank" className='link'>Instagram</a>,
                and <a href="https://www.untappd.com/v/beverage-express/866137" rel='noreferrer' target="_blank" className='link'>Untappd</a>
            </p>

            <a href='/search' className='link'><p className='button to-page'>To search our full product catalogue, please go to our Search Page.</p></a>

            <div className='menu-container'>
                <iframe loading='lazy' src="https://business.untappd.com/embeds/iframes/15228/56836" title='Untappd Menu' frameborder="0" height="2000" width="90%"></iframe>
            </div>
            
        </>
    )
};

export default Seasonal;