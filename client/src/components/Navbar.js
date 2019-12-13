import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { connect } from 'react-redux'

const links = [
    { text: 'Homes', path: 'homes' },
    { text: 'Contact Us', path: 'contact' },
]

const Nav = props => {
    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {

        });
    })

    return (
        <Fragment>
            <nav className={props.isHome ? 'home-nav z-depth-0' : 'z-depth-0'}>
                <Link to="/">
                    <span className="brand-logo">Logo</span>
                </Link>
                <ul className="right hide-on-small-only">
                    {links.map(link => (
                        <li key={link.path}>
                            <Link to={`/${link.path}`}>
                                <span>{link.text}</span>
                            </Link>
                        </li>
                    ))}
                    {!props.user ? (
                        <Fragment>
                            <li>
                                <a className="modal-trigger" href="#login">Log In</a>
                            </li>
                            <li>
                                <a className="modal-trigger" href="#signup">Sign Up</a>
                            </li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {!props.user.isHost && <li>
                                <Link to="/host">
                                    <span>Become a Host</span>
                                </Link>
                            </li>}
                            <li>
                                <a href="#!">Welcome, User</a>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </nav>

            {/* Login Modal */}
            <div id="login" className="modal">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>

            {/* Signup Modal */}
            <div id="signup" className="modal">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {})(Nav);
