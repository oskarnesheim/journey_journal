import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="">
            <ul>
                <li>
                    <Link to={'/home'}>Home</Link>
                </li>
                <li>
                    <Link to={'/profile'}>Profile</Link>
                </li>
                <li>
                    <Link to={'/about'}>AboutUs</Link>
                </li>
                <li>
                    <Link to={'/'}>Login</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;