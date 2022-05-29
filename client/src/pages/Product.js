import React from 'react'
import Footer from '../components/Footer'
import Header from './../components/Header'
import List from './../components/ProductList/List'
import { useParams } from 'react-router-dom'
const Product = () => {
    const params = useParams()
    const pageNumber = params.page
    console.log(pageNumber)
    return (
        <>
            <Header />
            <List pageNumber={pageNumber} />
            <Footer />
        </>

    )
}

export default Product