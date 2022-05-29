import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../../redux/actions/userAction'
import './Login.css'
const RegisterForm = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [repassword, setRePassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signup({ name, email, password }))
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
                    <input type="text" className="fadeIn second" id="login" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" name="name" required />
                    <input type="text" className="fadeIn third" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" name="email" required />

                    <input type="password" placeholder="Enter Password" id="password" required value={password} className="fadeIn third"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Repeat Password"
                        name="psw-repeat"
                        required
                        className="fadeIn four"
                        value={repassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                    <input type="submit" className="fadeIn fourth" value="Log In" />
                </form>


                {/* <div id="formFooter">
                    <Lin className="underlineHover" href="#">Forgot Password?</a>
                </div> */}

            </div>
        </div>
    )
}

export default RegisterForm