import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet } from 'react-router-dom'
export default function Root() {
    return (
        <div>
            <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/profile'}>Profile</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
    }