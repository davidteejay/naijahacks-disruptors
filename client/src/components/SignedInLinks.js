import React from 'react'
import { NavLink } from 'react-router-dom';

function SignedInLinks() {
    return (
        <div>
            <ul className="right">
                    <li><NavLink to='/host'>Host a home</NavLink></li>
                    <li><NavLink to ='/deals'>Rent a Home</NavLink></li>
                    <li><NavLink to='/contact'>Contact Us</NavLink></li>
            </ul>
        </div>
    )
}

export default SignedInLinks