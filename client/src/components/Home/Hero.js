import React, { useEffect, useRef, useState } from 'react'
import { slide } from './../../data'
const Hero = () => {
    const [slideIndex, setSlideIndex] = useState(1)
    const clickHandlerNext = () => {
        if (slideIndex < slide.length) {
            setSlideIndex(slideIndex + 1)
        } else {
            setSlideIndex(1)
        }

    }
    const clickHandlerPrev = () => {
        if (slideIndex <= 1) {
            setSlideIndex(slide.length)
        } else {
            setSlideIndex(slideIndex - 1)
        }

    }

    return (
        <div className="hero">
            <div className="slider">
                <div className="container">
                    {
                        slide.map((item, index) => {
                            return (
                                <div className={slideIndex === index + 1 ? 'slide active' : 'slide'} key={item.id}>
                                    <div className="info">
                                        <div className="info-content">
                                            <h3 className="top-down">
                                                JBL Quantum ONE
                                            </h3>
                                            <h2 className="top-down trans-delay-0-2">
                                                Ipsum dolor
                                            </h2>
                                            <p className="top-down trans-delay-0-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. A optio, voluptatum aperiam
                                                nobis quis maxime corporis porro alias soluta sunt quae consectetur aliquid blanditiis
                                                perspiciatis labore cumque, ullam, quam eligendi!
                                            </p>
                                            <div className="top-down trans-delay-0-6">
                                                <button className="btn-flat btn-hover">
                                                    <span>shop now</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`img ${item.animation}`}>
                                        <img src="https://i.pinimg.com/236x/ad/44/86/ad4486cca312235c148d81fda9d1afbc.jpg" alt="" />
                                    </div>
                                </div>
                            )


                        })
                    }
                </div>

                <button className="slide-controll slide-next" onClick={clickHandlerNext}>
                    <i className='bx bxs-chevron-right'></i>
                </button>
                <button className="slide-controll slide-prev" onClick={clickHandlerPrev}>
                    <i className='bx bxs-chevron-left'></i>
                </button>

            </div>
        </div>
    )
}

export default Hero