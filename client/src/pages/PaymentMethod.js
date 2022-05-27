import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from './../components/Header'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { payment_method } from '../redux/actions/cartAction'
const PaymentMethod = () => {
    const [method, setMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(payment_method(method))
        navigate('/order')
    }
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form
                    className="Login2 col-md-8 col-lg-4 col-11"
                    onSubmit={submitHandler}
                >
                    <h6>SELECT PAYMENT METHOD</h6>
                    <div className="payment-container">
                        <div className="radio-container">
                            <input className="form-check-input" onChange={(e) => setMethod(e.target.value)} type="radio" value={method} />
                            <label className="form-check-label">PayPal or Credit Card</label>
                        </div>
                    </div>

                    <button type="submit">

                        Continue

                    </button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default PaymentMethod