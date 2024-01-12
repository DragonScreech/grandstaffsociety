import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()

    return (
        <nav className='navbar'>
            <h1>Grand Staff Society</h1>
            <ul className='navlist'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/letters">Sheet Music</Link></li>
                <li><Link to="/comingsoon">Contact</Link></li>
                <li><Link to="/comingsoon">Gallery</Link></li>
                <li><Link to="/events">Events</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
