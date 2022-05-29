import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Hero from './../components/Home/Hero'
import { FiLogOut } from 'react-icons/fi'
import { userLogout } from '../redux/actions/userAction'
import { Navigate } from 'react-router-dom'
const Header = () => {
    const user = useSelector(state => state.users.user)
    const cart = useSelector(state => state.cart.cartItem)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(userLogout())
        navigate('/login')
    }
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
                        <Link to="/" className="logo"><h1 style={{ fontWeight: "800", color: "#1b8936",fontSize:"32px" }}>ONLINE STORE</h1></Link>

                        <ul className="nav-list d-flex">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/product`} className="nav-link">SHOP</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="#terms" className="nav-link">Terms</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#contact" className="nav-link">Contact</Link>
                            </li> */}
                        </ul>

                        <div className="icons d-flex">
                            {
                                user !== null ? (<><Link to={`/profile/${user._id}`} className="icon">
                                    <i className="bx bx-user"></i>
                                </Link> <FiLogOut className="text-success" onClick={logoutHandler} /></>) : <Link to="/login" className="login">login</Link>
                            }
                            {
                                user !== null ? (<div className="icon">

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