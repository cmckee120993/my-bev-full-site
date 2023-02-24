// burger menu
import { bubble as Menu } from 'react-burger-menu';

// auth
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from  '../../utils/queries';

// styling and images
import './style.css';
import bottle from '../../assets/images/bx-beer-bottle.webp';

function Navbar() {
    const { data } = useQuery(QUERY_USER);
    let user;
    if (data) {
        user = data.user;
    };
    console.log(data)


    function showNavigation() {
        if(Auth.loggedIn()) {
            return (
                <>
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
    function userTypeNav() {
        if (user === undefined) {
            return (
                <></>
            )
        } else if (user.admin === false) {
            return (
                <a className='bm-item menu-item' href='/customerpanel'>
                    Customer Panel
                </a>
            )
        } else if (user.admin === true) {
            return (
                <a className='bm-item menu-item' href='/adminpanel'>
                    Admin Panel
                </a>
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
            {userTypeNav()}
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