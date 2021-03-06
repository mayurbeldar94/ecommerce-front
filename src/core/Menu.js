import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import { itemTotal } from './cartHelpers'

const isActive = (history, path) => {

    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => (
    <div className='sticky-top'>
        <ul className='nav nav-tabs bg-primary'>
            <li className='nav-item'>
                <Link className='nav-link' style={isActive(history, '/')} to='/'>Home</Link>
            </li>

            <li className='nav-item'>
                <Link className='nav-link' style={isActive(history, '/shop')} to='/shop'>Shop</Link>
            </li>

            <li className='nav-item'>
                <Link className='nav-link' style={isActive(history, '/cart')} to='/cart'>
                    Cart <sup><small className='cart-badge'>{itemTotal()}</small></sup></Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/user/dashboard')} to='/user/dashboard'>Dashboard</Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>Dashboard</Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(history, '/Signup')} to='/Signup'>SignUp</Link>
                    </li>

                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(history, '/Signin')} to='/Signin'>Login</Link>
                    </li>
                </Fragment>
            )}
            <li className='nav-item'>
                <Link className='nav-link' style={isActive(history, '/aboutus')} to='/aboutus'>About us</Link>
            </li>
            {isAuthenticated() && (
                <li className='nav-item'>
                    <span className='nav-link' style={{ cursor: 'pointer', color: '#e60e23' }}
                        onClick={() => signout(() => {
                            history.push("/")
                        })}
                    >Logout</span>
                </li>
            )}


        </ul>
    </div>
)

export default withRouter(Menu)