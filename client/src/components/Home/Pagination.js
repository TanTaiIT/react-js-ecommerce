import React from 'react'
import { Link } from 'react-router-dom'
const Pagination = ({ pages, page, keyword = "" }) => {
    return (
        // <ul className="pagination">
        //     {
        //         [...Array(pages).keys()].map((x) => {
        //             return (
        //                 <li className={`page-item ${x + 1 === page ? 'active' : ""}`} key={x + 1}><Link to={`/pageNumber/${x + 1}`} className="page-link">{x + 1}</Link></li>
        //             )
        //         })
        //     }

        //     {/* <li className="page-item"><a className="page-link">2</a></li> */}
        // </ul>


        <section className="pagination">
            <div className="container">
                {
                    [...Array(pages).keys()].map((x) => {
                        return (
                            <>
                                <Link to={`/pageNumber/${x + 1}`} ><span className={`page-item ${x + 1 === page ? 'active' : ""}`}>{x + 1}</span></Link>
                                {/* <span><i className="bx bx-right-arrow-alt"></i></span> */}
                            </>
                        )
                    })
                }
                {/* <span><i className="bx bx-right-arrow-alt"></i></span> */}
                {/* <span>1</span> <span>2</span> <span>3</span> <span>4</span> */}

            </div>
        </section>
    )
}

export default Pagination