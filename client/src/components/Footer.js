import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="row">
                <div className="col d-flex">
                    <h4>INFORMATION</h4>
                    <Link to="">About us</Link>
                    <Link to="">Contact Us</Link>
                    <Link to="">Term & Conditions</Link>
                    <Link to="">Shipping Guide</Link>
                </div>
                <div className="col d-flex">
                    <h4>USEFUL LINK</h4>
                    <Link to="">Online Store</Link>
                    <Link to="">Customer Services</Link>
                    <Link to="">Promotion</Link>
                    <Link to="">Top Brands</Link>
                </div>
                <div className="col d-flex">
                    <span><i className='bx bxl-facebook-square'></i></span>
                    <span><i className='bx bxl-instagram-alt' ></i></span>
                    <span><i className='bx bxl-github' ></i></span>
                    <span><i className='bx bxl-twitter' ></i></span>
                    <span><i className='bx bxl-pinterest' ></i></span>
                </div>
            </div>
        </footer>
    )
}

export default Footer