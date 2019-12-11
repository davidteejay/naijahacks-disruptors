import React from 'react'
import { NavLink } from 'react-router-dom';

//when user is signed out
function SignedOutLinks() {
    return (
        <div>
            <ul className="right">
                <li><NavLink to='/signin'>Sign In</NavLink></li>
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks
