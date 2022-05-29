import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from './../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { MdLocalShipping } from 'react-icons/md'
import { GoLocation } from 'react-icons/go'
import { useSelector, useDispatch } from 'react-redux'
import { create_order } from '../redux/actions/orderAction'
import { ORDER_CREATE_RESET } from '../redux/constranst/orderContranst'
const Order = () => {
    const user = useSelector(state => state.users.user)
    const cart = useSelector(state => state.cart)
    const { shipping, cartItem, payment } = cart
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sub = cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = (((sub * 5) / 100))
    const ship = sub > 500 ? 0 : 50
    const total = (sub + tax + ship)
    const placeOrderHandler = (e) => {
        e.preventDefault()
        dispatch(create_order({ orderItems: cartItem, shippingAddress: shipping.address, paymentMethod: payment, itemPrice: sub, shippingPrice: ship, taxPrice: tax, totalPrice: total }))
    }
    const orderCreate = useSelector(state => state.order)
    const { order, success, error } = orderCreate
    useEffect(() => {
        if (success) {
            navigate(`/payment/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [navigate, dispatch, success, order])
    return (
        <>
            <Header />
            <div className="container mb-5">
                <div className="row  order-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row ">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <Link to='/'>{<BiUser />}</Link>
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Customer</strong>
                                </h5>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <MdLocalShipping />
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Order info</strong>
                                </h5>
                                <p>Shipping: {shipping.address}</p>
                                <p>Pay method:{payment}</p>
                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    {<GoLocation />}
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Deliver to</strong>
                                </h5>
                                <p>
                                    Address: {shipping.address}, {''},{shipping.city},{''}{shipping.country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-8">
                        {/* <Message variant="alert-info mt-5">Your cart is empty</Message> */}
                        {

                            <div className="order-product row">
                                {
                                    cartItem.map((item) => {
                                        return (
                                            <>
                                                <div className="col-md-3 col-6 mb-3" key={item.product}>
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className="col-md-5 col-6 d-flex align-items-center">
                                                    <Link to={"/"}>
                                                        <h4>{item.name}</h4>
                                                    </Link>
                                                </div>
                                                <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                                                    <h4>QUANTITY</h4>
                                                    <h4>{item.qty}</h4>
                                                </div>
                                                <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                                                    <h4>SUBTOTAL</h4>
                                                    <h4>${(item.price * item.quantity).toFixed(2)}</h4>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        }

                    </div>
                    {/* total */}
                    <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Products</strong>
                                    </td>
                                    <td>${sub}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Shipping</strong>
                                    </td>
                                    <td>${ship}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Tax</strong>
                                    </td>
                                    <td>${tax}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Total</strong>
                                    </td>
                                    <td>${total}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" onClick={placeOrderHandler}>

                            PLACE ORDER

                        </button>
                        {/* <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Order