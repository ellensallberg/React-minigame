import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function LogIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const signUp = () => {
        const userData = {username, password}
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)

        setMessage("Account created")

        setUsername("")
        setPassword("")
    }

    const logIn = () => {
        const storedUsername = localStorage.getItem("username")
        const storedPassword = localStorage.getItem("password")

        if (username === storedUsername && password === storedPassword) {
            setMessage("logged in")
            navigate("/API")
        } else {
            setMessage("incorrect username or password")
        }
    }

    return(
        <div className="lp">
            <h2 className="lpTitle">Log in / Sign up</h2>
            
            <div className="inputs">
                <input 
                className="input"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

                <input
                className="input"
                type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <p className="errorMsg">{message}</p>

            <div>
                <button className="loginBtn" onClick={logIn}>Log in</button>
                <button className="signupBtn" onClick={signUp}>Sign up</button>
            </div>
        </div>
    )
}

export default LogIn