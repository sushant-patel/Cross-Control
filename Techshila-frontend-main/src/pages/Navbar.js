import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./css.css"

const Navbar = () => {
    const navigate=useNavigate()

    const signOut = () =>{
        console.log('signing out')
        localStorage.removeItem('techshillaauthtoken');
        navigate('/login')
    }

    const RefreshPage =()=>{
        window.location.reload()
    }

    return (
        <div className="HomePage" style={{overflow:"hidden", borderBottom: "1px solid rgba(35, 33, 116, 0.3)"}}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="navbar-brand mx-4" href="#">Cross Control</span>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav  me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item mx-2">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => { signOut() }}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
           
        </div>
    )
}

export default Navbar;