import React from 'react';

// fontawesome set up
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// style and logo imports
import './style.css';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUntappd } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import clayLogo from '../../assets/images/clays-logo.webp';

function Footer() {
    return(
        <footer>
            {/* links to social media and contact */}
            <div className='social-links'>
                <a href="https://www.facebook.com/wholelottabeer/" alt='Link to Beverage Express Facebook' target="_blank" rel='noreferrer'>
                    <FontAwesomeIcon alt='Beverage Express Facebook' className="footer-icon" icon={faFacebook} />
                </a>

                <a alt='Link to Beverage Express Instagram' href="https://www.instagram.com/bevexcarlisle/" target="_blank" rel='noreferrer'>
                    <FontAwesomeIcon alt='Beverage Express Instagram' className="footer-icon" icon={faInstagram} />
                </a>

                <a href="https://www.untappd.com/v/beverage-express/866137" target="_blank" rel='noreferrer'>
                    <FontAwesomeIcon className="footer-icon" icon={faUntappd} />
                </a>

                <a href="mailto: bev.express.carlisle@gmail.com" target="_blank" rel='noreferrer'>
                    <FontAwesomeIcon className="footer-icon" icon={faPaperPlane} />
                </a>
            </div>
            
            {/* Web developer information */}
            <div className='site-creator'>
                <img
                    src={clayLogo}
                    alt="Clay's Creative Solutions Logo"
                />
                <p className='copyright'>©2023 Clay's Creative Solutions</p>
            </div>
                
            <div className='site-creator-contact'>
                <a className='creator-site' href='www.clayscreativesolutions.com' target='_blank' rel='noreferrer'>www.clayscreativesolutions.com</a>
                <a className='creator-email' href='mailto: clayscreativesolutions@gmail.com' target='_blank' rel='noreferrer'>clayscreativesolutions@gmail.com</a>
            </div>
            
        </footer>
    );
};

export default Footer;