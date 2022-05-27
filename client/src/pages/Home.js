import React from 'react'
import Header from './../components/Header'
import Category from './../components/Home/Category'
import NewArrival from '../components/Home/NewArrival'
import Banner from '../components/Home/Banner'
import Contact from '../components/Home/Contact'
import Footer from '../components/Footer'
import Hero from './../components/Home/Hero'
import { useParams } from 'react-router-dom'
const Home = ({ match }) => {
    // window.scrollTo(0, 0)
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber
    return (
        <>
            <Header />
            <Hero />
            <Category />
            <NewArrival keyword={keyword} pageNumber={pageNumber} />
            <Banner />
            <Contact />
            <Footer />
        </>

    )
}

export default Home