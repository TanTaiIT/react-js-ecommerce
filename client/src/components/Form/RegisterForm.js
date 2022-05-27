import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../../redux/actions/userAction'
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
        <div className="container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <p>
                        Please fill in this form to create an account. or
                        <Link to="/login">Login</Link>
                    </p>
                    <label htmlFor="email">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" name="name" required />

                    <label htmlFor="email">Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" name="email" required />

                    <label htmlFor="psw">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="psw"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="psw-repeat">Repeat Password</label>
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        name="psw-repeat"
                        required
                        value={repassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />

                    <p>
                        By creating an account you agree to our
                        <Link to="#">Terms & Privacy</Link>.
                    </p>

                    <div className="buttons">
                        {/* <button type="button" className="cancelbtn">Cancel</button> */}
                        <button type="submit" className="signupbtn">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm