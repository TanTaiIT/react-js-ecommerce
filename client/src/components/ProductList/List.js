import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from './../Loading/Loading'
import Paginate from './Paginate'
const List = ({ pageNumber = "" }) => {
    const params = useParams()
    const CateId = params.category || 'empty'
    const initialState = {
        loading: false,
        product: [],
        error: ''
    }
    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/category/${CateId}`)
            setpage(data.Page)
            setPageSize(data.pages)
        }
        fetching()
    }, [CateId])
    const Reducer = (state, action) => {
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
    const [state, dispatch] = useReducer(Reducer, initialState)
    useEffect(() => {
        dispatch({ type: 'LOADING' })
        try {
            const getData = async () => {
                const { data } = await axios.get(`/api/category/${CateId}?pageNumber=${pageNumber}`)
                dispatch({ type: 'SUCCESS', payload: data.pro })
            }
            getData()
        } catch (error) {
            dispatch({ type: 'FAIL', payload: error.response.data.message ? error.response.data.message : error.message })
        }


    }, [CateId, dispatch, pageNumber])
    const [pageSize, setPageSize] = useState(1)
    const [page, setpage] = useState(1)

    const { product, loading, error } = state
    const changeHandler = (e) => {
        e.preventDefault()
        setSort1(e.target.value)
    }
    const [sort1, setSort1] = useState('price-increase')
    const sapxep = product.sort((a, b) => {
        var revert
        if (sort1 === "price-increase") {
            revert = 1
        } else if (sort1 === "price-decrease") {
            revert = -1
        } else if (sort1 === "apha-decrease") {
            return a.price - b.price
        } else if (sort1 === "apha-increase") {
            return b.price - a.price
        }
        return revert * a.name.localeCompare(b.name)
    })
    return (
        <>
            <section className="section all-products" id="products">
                <div className="top container">
                    <h1>All Products</h1>
                    <form>
                        <select onChange={changeHandler}>
                            {/* <option value="1">Defualt Sorting</option> */}
                            <option value="price-increase">A-Z</option>
                            <option value="price-decrease">Z-A</option>
                            <option value="apha-decrease">Price increase</option>
                            <option value="apha-increase">Price decrease</option>

                            {/* <option value="3">Sort By Popularity</option>
                            <option value="4">Sort By Sale</option>
                            <option value="5">Sort By Rating</option> */}
                        </select>
                        <span><i className="bx bx-chevron-down"></i></span>
                    </form>
                </div>
                {
                    loading ? <Loading /> : (<div className="product-center container">
                        {
                            sapxep.map(item => {
                                return (
                                    <div className="product-item" key={item._id}>
                                        <Link to={`/detail/${item._id}`}>
                                            <div className="overlay">
                                                <Link to="productDetails.html" className="product-thumb">
                                                    <img src={item.image} alt="" />
                                                </Link>
                                                <span className="discount">40%</span>
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
                    </div>)
                }

            </section>
            <Paginate page={page} pages={pageSize} />
            {/* <section className="pagination">
                <div className="container">
                    <span>1</span> <span>2</span> <span>3</span> <span>4</span>
                    <span><i className="bx bx-right-arrow-alt"></i></span>
                </div>
            </section> */}
        </>
    )
}

export default List