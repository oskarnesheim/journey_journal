import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Iuser } from "../interfaces/Interfaces";
import { UserState } from "../recoil/atoms";
import "./css/components.css";

const Navbar = () => {
    const [user, setUser] = useRecoilState(UserState);
    const navigate = useNavigate();

    return(
        <div className="Navbar">
            <ul className="NavbarInline">
                <li className="homebutton">
                    <Link to={'/home'}><img src='../images/journey-journal-high-resolution-logo-color-on-transparent-background.png'/></Link>
                </li>
                <li className='hover:text-pink-500'>
                    <Link  to={'/home'}>Home</Link>
                </li>
                {user && <li className='hover:text-pink-500'>
                    <Link  to={'/profile'}>Profile</Link>
                </li>}
                <li className='hover:text-pink-500'>
                    <Link to={'/about'}>About us</Link>
                </li>
                {/* <li className='hover:text-pink-500'>
                    <Link to={'/'}>Login</Link>
                </li> */}
                { user && <li>
                     <p>{'Welcome back ' + user.firstname}</p>
                </li>}
                <li className='hover:text-pink-500'>
                    {user ? 
                    <button onClick={() => {
                        setUser(undefined);
                        getAuth().signOut();
                        navigate('/');
                        }}>Logout</button>
                    :
                    <Link to={'/'}>Login</Link>}
                </li>
                {/* <li>
                     <p className="welcomeBack">{user ? 'Welcome back ' + user.firstname : "You are not logged in"}</p>
                </li> */}
            </ul>
        </div>
    )
}

export default Navbar;