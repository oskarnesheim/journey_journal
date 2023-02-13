import { Link, Outlet } from 'react-router-dom'
export const Root = () => {
    return (
        <div>
            <div>
                <Link to={'/home'}>Home</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/about'}>AboutUs</Link>
                <Link to={'/'}>Login</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}