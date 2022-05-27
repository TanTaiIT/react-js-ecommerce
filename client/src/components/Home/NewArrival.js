import React, { useState, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Pagination from './Pagination'
const NewArrival = ({ pageNumber = "", keyword = "" }) => {
    const initialState = {
        loading: false,
        products: [],
        error: ''
    }
    function reducer(state, action) {
        switch (action.type) {
            case 'PRODUCT_REQUEST':
                return { ...state, loading: true }
            case 'PRODUCT_SUCCESS':
                return { ...state, loading: false, products: action.payload }
            case 'PRODUCT_ERROR':
                return { ...state, loading: false, error: action.payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: "PRODUCT_REQUEST" })
        try {
            const fetData = async () => {
                const { data } = await axios.get(`/api/product/?keyword=${keyword}&pageNumber=${pageNumber}`)
                dispatch({ type: "PRODUCT_SUCCESS", payload: data })
            }
            fetData()

        } catch (error) {
            const message = error.response.data.message ? error.response.data.message : error.message
            dispatch({ type: "PRODUCT_ERROR", payload: message })
        }
    }, [keyword, pageNumber])
    const { products } = state
    const product = products.product
    return (
        <section className="section new-arrival">
            <div className="title">
                <h1>NEW ARRIVALS</h1>
                <p>All the latest picked from designer of our store</p>
            </div>

            <div className="product-center">
                {
                    product && product.map((item) => {
                        return (
                            <div className="product-item" key={item._id}>
                                <Link to={`/detail/${item._id}`}>
                                    <div className="overlay">
                                        <Link to={`/detail/${item._id}`} className="product-thumb">
                                            <img src={item.image} alt="" />
                                        </Link>
                                    </div>
                                    <div className="product-info">
                                        <span>MEN'S CLOTHES</span>
                                        <Link to={`/detail/${item._id}`}>{item.name}</Link>
                                        <h4>${item.price}</h4>
                                    </div>
                                </Link>
                                {/* <ul className="icons">
                                    <li><i className="bx bx-heart"></i></li>
                                    <li><i className="bx bx-search"></i></li>
                                    <li><i className="bx bx-cart"></i></li>
                                </ul> */}
                            </div>
                        )
                    })
                }
            </div>
            <Pagination pages={products.pages} page={products.Page} keyword={keyword} />
        </section>
    )
}

export default NewArrival