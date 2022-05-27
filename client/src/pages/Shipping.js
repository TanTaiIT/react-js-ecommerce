import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from './../components/Header'
import {  useNavigate } from 'react-router-dom'
import { shipping } from '../redux/actions/cartAction'
import { useDispatch } from 'react-redux'
const Shipping = () => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postCode, setPostCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(shipping({ address, city, postCode, country }))
        navigate('/method')
    }
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form
                    className="Login col-md-8 col-lg-4 col-11"
                    onSubmit={submitHandler}
                >
                    <h6>DELIVERY ADDRESS</h6>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" required />
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" required />
                    <input type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} placeholder="Enter postal code" required />
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter country" required />
                    <button type="submit">

                        Continue

                    </button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Shipping