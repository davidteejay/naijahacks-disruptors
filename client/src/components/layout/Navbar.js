import React from 'react'
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

//When user is signed in
function Navbar() {
    return (
        <div>
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                <Link to='/' className="brand-logo">Logo</Link>
                <SignedInLinks />
                <SignedOutLinks />
                </div>
       </nav>
        </div>
    )
}

export default Navbar;