import React from 'react'
import { Link } from 'react-router-dom'
const Pagination = ({ pages, page, keyword = "" }) => {
    return (
        <section className="pagination">
            <div className="container">
                {
                    [...Array(pages).keys()].map((x) => {
                        return (
                            <>
                                <Link to={`/product/pageNumber/${x + 1}`} ><span className={`page-item ${x + 1 === page ? 'active' : ""}`}>{x + 1}</span></Link>
                            </>
                        )
                    })
                }

            </div>
        </section>
    )
}

export default Pagination