import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Toast from '../Loading/Toast'
import { add_cart } from '../../redux/actions/cartAction'
import Loading from './../Loading/Loading'
const ProductDetail = () => {
    const params = useParams()
    const proId = params.id
    const inititalState = {
        loading: false,
        product: {},
        error: ''
    }
    const ToastObj = {

    }
    const reducer = (state, action) => {
        switch (action.type) {
            case 'LOADING':
                return { ...state, loading: true }
            case 'SUCCESS':
                return { ...state, loading: false, product: action.payload }
            case 'FAIL':
                return { ...state, loading: false, error: action.payload }
            default:
                return state
        }
    }
    const [state, dixpatch] = useReducer(reducer, inititalState)
    useEffect(() => {
        dixpatch({ type: 'LOADING' })
        try {
            const fetData = async () => {
                const { data } = await axios.get(`/api/product/${proId}`)
                dixpatch({ type: 'SUCCESS', payload: data })
            }
            fetData()
        } catch (error) {
            const message = error.response.data.message ? error.response.data.message : error.message
            dixpatch({ type: 'FAIL', payload: message })
        }
    }, [proId])
    const [quantity, setQuantity] = useState(1)
    const handleChange = (e) => {
        setQuantity(e.target.value)
    }
    const dispatch = useDispatch()
    const addToCart = (e) => {
        e.preventDefault()
        dispatch(add_cart(proId, quantity))

    }
    const { product, loading } = state
    return (
        <>
            <Toast />
            {
                loading ? <Loading /> : (<section className="section product-detail">
                    <div className="details container">
                        <div className="left image-container">
                            <div className="main">
                                <img src={product.image} id="zoom" alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <span>Home/T-shirt</span>
                            <h1>{product.name}</h1>
                            <div className="price">${product.price}</div>
                            {/* <form>
                        <div>
                            <select>
                                <option value="Select Size" selected disabled>
                                    Select Size
                                </option>
                                <option value="1">32</option>
                                <option value="2">42</option>
                                <option value="3">52</option>
                                <option value="4">62</option>
                            </select>
                            <span><i className="bx bx-chevron-down"></i></span>
                        </div>
                    </form> */}
                            {/* <div>
                        <select>
                            <option>1</option>
                            <option>1</option>
                        </select>
                    </div> */}
                            <form className="form">
                                <input type="number" placeholder="1" value={quantity} className="quantity" onChange={handleChange} />
                                <button className="addCart" onClick={addToCart}>Add To Cart</button>
                            </form>
                            <h3>Product Detail</h3>
                            <p>
                                {product.description}
                            </p>
                        </div>
                    </div>
                </section>)
            }

        </>
    )
}

export default ProductDetail