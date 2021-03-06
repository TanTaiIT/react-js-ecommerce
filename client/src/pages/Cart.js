import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { add_cart, remove_cart } from '../redux/actions/cartAction'
const Cart = () => {
    const cart = useSelector(state => state.cart.cartItem)
    const dispatch = useDispatch()
    const Decimal = (num) => {
        return ((num * 100) / 100).toFixed(2)
    }
    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const subs = sub.toFixed(2)
    const tax = (((sub * 5) / 100))
    const taxs = tax.toFixed(2)
    const ship = sub > 500 ? 0 : 50
    const total = Decimal(sub + tax + ship)

    return (
        <>
            <Header />
            <div className="container cart">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart.map((item) => {
                                return (
                                    <tr key={item.product}>
                                        <td>
                                            <div className="cart-info">
                                                <img src={item.image} alt="" />
                                                <div>
                                                    <p>Boy’s T-Shirt</p>
                                                    <span>Price:  ${item.price}</span> <br />
                                                    <Link to="" onClick={() => dispatch(remove_cart(item.product))}>remove</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td><input type="number" value={item.quantity} onChange={(e) => dispatch(add_cart(item.product, Number(e.target.value)))} placeholder={item.qty} min="1" max={item.countInStock} /></td>
                                        <td> ${(item.price * Number(item.quantity)).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>


                </table>
                <div className="total-price">
                    <table>
                        <tbody>
                            <tr>
                                <td>Subtotal</td>
                                <td>${subs}</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td>${taxs}</td>
                            </tr>
                            <tr>
                                <td>shipping</td>
                                <td>${ship}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>${total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/shipping" className="checkout btn">Proceed To Checkout</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart