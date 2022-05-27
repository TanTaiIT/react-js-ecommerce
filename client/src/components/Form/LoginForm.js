import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../redux/actions/userAction'
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
        <div className="container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p>
                        Already have an account? Login in or
                        <Link to="/register">Sign Up</Link>
                    </p>

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

                    {/* <label>
                        <input
                            type="checkbox"
                            // checked="checked"
                            name="remember"
                        />
                        Remember me
                    </label> */}

                    {/* <p>
                        By creating an account you agree to our
                        <Link to="#">Terms & Privacy</Link>.
                    </p> */}

                    <div className="buttons">
                        {/* <button type="button" className="cancelbtn">Cancel</button> */}
                        <button type="submit" className="signupbtn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm