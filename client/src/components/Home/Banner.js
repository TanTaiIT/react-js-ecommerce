import React from 'react'
import {Link} from 'react-router-dom'
const Banner = () => {
    return (
        <section className="section banner">
            <div className="left">
                <span className="trend">Trend Design</span>
                <h1>New Collection 2021</h1>
                <p>New Arrival <span className="color">Sale 50% OFF</span> Limited Time Offer</p>
                <Link to="#" className="btn btn-1">Discover Now</Link>
            </div>
            <div className="right">
                <img src="./images/banner.png" alt=""/>
            </div>
        </section>
    )
}

export default Banner