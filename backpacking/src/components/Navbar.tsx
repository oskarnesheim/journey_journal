import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="Navbar">
            <ul className="NavbarInline">
                <li className="homebutton">
                    <Link to={'/home'}><img src='../images/journey-journal-high-resolution-logo-color-on-transparent-background.png'/></Link>
                </li>
                <li className='hover:text-pink-500'>
                    <Link  to={'/profile'}>Profile</Link>
                </li>
                <li className='hover:text-pink-500'>
                    <Link to={'/about'}>About us</Link>
                </li>
                <li className='hover:text-pink-500'>
                    <Link to={'/'}>Login</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;