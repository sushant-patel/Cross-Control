import "./css.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const backEndUrl='http://192.168.189.137:3000'

function Register() {
    const navigate = useNavigate()
    const [err, setErr] = useState(false)


    const RegisterWithIdPwd = async (name , password) =>{
        const data={
            name: name,
            pwd: password
        }
        const options={
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch(backEndUrl+"/api/auth/createuser", options)
        const res= await response.json()
        const auth_token=res['auth-token']
        if(auth_token){
            //Save the auth token and redirect on the other site
            console.log("authentication successful")
            localStorage.setItem('techshillaauthtoken', auth_token);
            localStorage.setItem('techshillausername', name)
            navigate('/')
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()  // stop refreshing the page
        // console.log(e.target[0].value)
        const email = e.target[0].value
        const password = e.target[1].value
        const confirmPwd=e.target[2].value

        try {
            if(password===confirmPwd){
                await  RegisterWithIdPwd(email, password)
                navigate("/")
            }
            else{
                throw "Both Passwords must match"
            }
        } catch (err) {
            console.log(err)
            setErr(true)
        }
    }

    useEffect(()=>{
        const token =localStorage.getItem('techshillaauthtoken');
        if(token)
            navigate('/')
    }, )

    return (
        <div className="Register-page">
            <div className="Regsiter-box">
                <div className="appName">Cross Control</div>
                <div className="page-type">Register</div>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Enter your Email" />
                    <input type="password" placeholder="Enter Passowrd" />
                    <input type="password" placeholder="Confirm Passowrd" />
                    <button className="Signup-btn">Signup</button>
                    {err && <span>Something went Wrong</span>}
                </form>
                <p className="DirToLoginsignup" >Already Sigup ? <Link to="/login" style={{ cursor: "pointer" }}>Login</Link></p>
            </div>
        </div>
    )
}

export default Register;