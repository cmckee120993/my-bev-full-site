// burger menu
import { bubble as Menu } from 'react-burger-menu';

// auth
import Auth from '../../utils/auth';

// styling and images
import './style.css';
import bottle from '../../assets/images/bx-beer-bottle.webp';

function Navbar() {

    function showNavigation() {
        if(Auth.loggedIn()) {
            return (
                <>
                    <a className='bm-item menu-item' href='/customerpanel'>
                    Customer Panel
                    </a>
                    <br/>
                    <a onClick={() => Auth.logout()} className='bm-item menu-item' href='/'>
                    Logout
                    </a>
                </>
            )
        } else {
            return (
                <>
                    <a className='bm-item menu-item' href='/signup'>
                        Signup
                    </a>
                    <br/>
                    <a className='bm-item menu-item' href='/login'>
                        Login
                    </a>
                </>
            )
        }
    }
    return ( 
        <Menu>
            <a className='menu-item' href='/'>
                Home
            </a>
            <a className='menu-item' href='/seasonal'>
                What's On Tap?
            </a>
            <a className='menu-item' href='/search'>
                Search
            </a>
            <a className='menu-item' href='/contact'>
                Contact
            </a>
            {showNavigation()}
            <img 
                src={bottle}
                alt="Beverage Express Beer Bottle Logo"
                className="nav-logo"
            />
        </Menu>
    )
};

export default Navbar;