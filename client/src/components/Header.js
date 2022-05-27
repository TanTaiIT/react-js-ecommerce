import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Hero from './../components/Home/Hero'
import { FiLogOut } from 'react-icons/fi'
const Header = () => {
    const user = useSelector(state => state.users.user)
    const cart = useSelector(state => state.cart.cartItem)
    return (
        <>
            <header >

                <div className="top-nav">
                    <div className="container d-flex">
                        <p>Order Online Or Call Us: (001) 2222-55555</p>
                        <ul className="d-flex">
                            <li><Link to="#">About Us</Link></li>
                            <li><Link to="#">FAQ</Link></li>
                            <li><Link to="#">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="navigation">
                    <div className="nav-center container d-flex">
                        <Link to="/" className="logo"><h1>Dans</h1></Link>

                        <ul className="nav-list d-flex">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/product`} className="nav-link">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#terms" className="nav-link">Terms</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#contact" className="nav-link">Contact</Link>
                            </li>
                        </ul>

                        <div className="icons d-flex">
                            {
                                user !== null ? (<Link to={`/profile/${user._id}`} className="icon">
                                    <i className="bx bx-user"></i>
                                </Link>) : <Link to="/login" className="login">login</Link>
                            }
                            {
                                user !== null ? (<div className="icon">
                                    <FiLogOut className="text-success" />
                                </div>) : null
                            }

                            <div className="icon">
                                <i className="bx bx-heart"></i>
                                <span className="d-flex">0</span>
                            </div>
                            <Link to="/cart" className="icon">
                                <i className="bx bx-cart"></i>
                                <span className="d-flex">{cart.length}</span>
                            </Link>
                        </div>

                        <div className="hamburger">
                            <i className="bx bx-menu-alt-left"></i>
                        </div>
                    </div>
                </div>


            </header>



        </>
    )
}

export default Header