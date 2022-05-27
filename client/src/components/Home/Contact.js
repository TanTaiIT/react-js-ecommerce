import React from 'react'
import { Link } from 'react-router-dom'
const Contact = () => {
    return (
        <section className="section contact">
            <div className="row">
                <div className="col">
                    <h2>EXCELLENT SUPPORT</h2>
                    <p>We love our customers and they can reach us any time
                        of day we will be at your service 24/7</p>
                    <Link to="" className="btn btn-1">Contact</Link>
                </div>
                <div className="col">
                    <form action="">
                        <div>
                            <input type="email" placeholder="Email Address" />
                            <Link to="">Send</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default Contact