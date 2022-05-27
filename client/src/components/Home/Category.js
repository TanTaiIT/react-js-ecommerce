import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Category = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/api/category')
            setCategory(data)
        }
        getData()
    }, [])
    return (
        <section className="section category">
            <div className="cat-center">
                {
                    category.map((item) => {
                        return (
                            <div className="cat" key={item._id}>
                                <img src={item.image} alt="" />
                                <div className="category-title">
                                    <Link to={`/product/${item._id}`}><p>{item.name}</p></Link>
                                </div>
                            </div>
                        )
                    })
                }
                {/* <div className="cat">
                    <img src="/images/cat3.jpg" alt="" />
                    <div>
                        <Link to={`/product/`}><p>WOMEN'S WEAR</p></Link>
                    </div>
                </div>
                <div className="cat">
                    <img src="/images/cat2.jpg" alt="" />
                    <div>
                        <Link to={`/product/r4r`}><p>ACCESSORIES</p></Link>
                    </div>
                </div>
                <div className="cat">
                    <img src="/images/cat1.jpg" alt="" />
                    <div>
                        <Link to={`/product/r4r`}><p>MEN'S WEAR</p></Link>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default Category