import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../redux/actions/userAction'
import './Login.css'
const LoginForm = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [repassword, setRePassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signin({ email, password }))
        navigate('/')
    }
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">

                <h2 className="active"> Sign In </h2>
                <h2 className="inactive underlineHover"><Link to='/register' >Sign Up</Link></h2>


                <div className="fadeIn first">
                    <img src="/images/user.png" id="icon" alt="User Icon" style={{ width: "20%" }} />
                </div>


                <form onSubmit={handleSubmit}>
                    <input type="text" id="login" value={email} onChange={(e) => setEmail(e.target.value)} className="fadeIn second" name="login" placeholder="email" />
                    <input type="text" id="password" className="fadeIn third" required value={password}
                        onChange={(e) => setPassword(e.target.value)} name="login" placeholder="password" />
                    <input type="text" id="password" className="fadeIn third" required value={repassword}
                        onChange={(e) => setRePassword(e.target.value)} name="login" placeholder="re-password" />
                    <input type="submit" className="fadeIn fourth" value="Log In" />
                </form>


                {/* <div id="formFooter">
                    <Lin className="underlineHover" href="#">Forgot Password?</a>
                </div> */}

            </div>
        </div>


    )
}

export default LoginForm