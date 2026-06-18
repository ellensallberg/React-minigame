import {BrowserRouter, Routes, Route} from "react-router-dom"
import LogIn from './LoginPage.jsx'
import API from './API.jsx'


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LogIn />}/>
                    <Route path="/API" element={<API />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
