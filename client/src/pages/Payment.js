import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ORDER_PAY_RESET } from '../redux/constranst/orderContranst'
import axios from 'axios'
import { getOrder, payOrder } from '../redux/actions/orderAction'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { GoLocation } from 'react-icons/go'
import moment from 'moment'
import { clear } from '../redux/actions/cartAction'
const Payment = () => {
    const match = useParams()
    const orderId = match.id
    const orderDetail = useSelector(state => state.orderDetail)
    const { order, loading, error } = orderDetail

    // console.log(order)
    const cart = useSelector(state => state.cart)
    const { cartItem, shipping, payment } = cart

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    let sub = 0
    if (order) {
        const subs = addDecimal(order && order.orderItems.reduce((tong, item) => tong + item.price * item.quantity, 0))
        sub = Number(subs)
    }
    const [sdkReady, setSdkReady] = useState(false)
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
    const dispatch = useDispatch()
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrder(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, order]);
    const navigate = useNavigate()
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
        dispatch(clear())
        navigate('/')
    }

    return (
        <>
            <Header />
            {loading ? (<>...LOading</>) : (<div className="container">
                <div className="row  order-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <AiOutlineUser />
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Customer</strong>
                                </h5>
                                <p>{order.user.name}</p>
                                <p>
                                    <a href={`mailto:`}>{order.user.email}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <MdOutlineLocalShipping />
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Order info</strong>
                                </h5>
                                <p>Shipping: {shipping.country}</p>
                                <p>Pay method:{payment}</p>
                                {
                                    order.isPaid ? (<div className="bg-info p-2 col-12">
                                        <p className="text-white text-center text-sm-start">
                                            Paid on {moment(order.createdAt).calendar()}
                                        </p>
                                    </div>) : (<div className="bg-info p-2 col-12">
                                        <p className="text-white text-center text-sm-start">
                                            Not Paid
                                        </p>
                                    </div>)
                                }


                                {/* <div className="bg-info p-2 col-12">
                                                <p className="text-white text-center text-sm-start">
                                                    Not Paid
                                                </p>
                                            </div> */}


                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <GoLocation />
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Deliver to</strong>
                                </h5>
                                <p>
                                    Address: {shipping.city} , {shipping.address} , {shipping.country}
                                </p>
                                {order.isDeliverd ? (<div className="bg-danger p-1 col-12">
                                    <p className="text-white text-center text-sm-start">
                                        Dilivered on {moment(order.deliveredAt).calendar()}
                                    </p>
                                </div>) : (<div className="bg-danger p-1 col-12">
                                    <p className="text-white text-center text-sm-start">
                                        Not Delivered
                                    </p>
                                </div>)}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-8">
                        {/* <Message variant="alert-info mt-5">Your order is empty</Message> */}
                        {/* {
                                    order.orderItems && order.orderItems.length === 0 ? <Message variant="alert-info">Your order is empty</Message> :
                                        order.orderItems.map((item, index) => {
                                            return ( */}
                        {
                            cartItem.map((item) => {
                                return (
                                    <div className="order-product row" key={item.product}>
                                        <div className="col-md-3 col-6">
                                            <img src={item.image} alt="product" />
                                        </div>
                                        <div className="col-md-5 col-6 d-flex align-items-center">
                                            <Link to={`/`}>
                                                <h6>asdfasdf</h6>
                                            </Link>
                                        </div>
                                        <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                                            <h4>QUANTITY</h4>
                                            <h6>343</h6>
                                        </div>
                                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                                            <h4>SUBTOTAL</h4>
                                            <h6>$534</h6>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {/* )
                                        })
                                } */}


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
                                    <td>${order.shippingPrice}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Tax</strong>
                                    </td>
                                    <td>${order.taxPrice}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Total</strong>
                                    </td>
                                    <td>${order.totalPrice}</td>
                                </tr>
                            </tbody>


                        </table>


                        <div className="col-12">
                            <PayPalButton amount={sub} onSuccess={successPaymentHandler} />
                        </div>


                    </div>
                </div>
            </div>)}
            <div className="container">




            </div>
        </>
    )
}

export default Payment