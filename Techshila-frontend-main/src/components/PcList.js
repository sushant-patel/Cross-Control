import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import "./pc.css"
import { shuthiber } from "../pages/shutdownhiberfunctions";
const backEndUrl='http://192.168.189.137:3000'

const PcList = () => {
    const navigate= useNavigate()
    const handleShutHiber = async (url, task, id) =>{
    try {
        await shuthiber(url, task, id)
        //window.location.reload()
    } catch (error) {
        console.log(error)   
    }        
}

const refreshPage = () =>{
    window.location.reload()
}
  
  const [computers, setcomputers] = useState([])
  
  const loadPage = async ()=>{
    const token =localStorage.getItem('techshillaauthtoken');
    if(!token)
        navigate('/login')

    try {
        const data={
            userName: localStorage.getItem('techshillausername')
        }

        const options={
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token": token

            },
            body: JSON.stringify(data)
        }

        const urlOfHit=backEndUrl+"/api/devices/devicelist"
        
        const response = await fetch(urlOfHit, options)
        const res= await response.json()

        if(res){
            setcomputers(res)
        }
    } catch (error) {
        console.log(error)
        navigate('/login')
    }  
}


  useEffect(()=>{
    loadPage()
  }, [])
      


    return (
        <div className="pclist">
            <div className="refreshDiv">
                <span className="material-symbols-outlined refresh-btn ref-2" onClick={refreshPage}>refresh</span>
            </div>
            <div className="listofPC">
            {
                (Array.isArray(computers))?
                (computers?.map((computer, index) => (
                    <div className={`pc-card ${(computer.active===false?'color-grey':'pc-card-color')}`} key={index}>
                        <div className="pcName">{computer.deviceName}</div>
                        { 
                            (computer.active===false)?
                            (
                                <div>
                                    <h3>PC currently Incactive</h3>
                                </div>
                            ):(
                                <div>
                                    <div className="pcFunc">
                                        <button className="pcFuncBtn" onClick={()=>{handleShutHiber(computer.url, "shutdown", computer._id)}}>Shut Down</button>
                                        <button className="pcFuncBtn" onClick={()=>{handleShutHiber(computer.url, "hibernate", computer._id)} }>Hibernate</button>
                                    </div>
                                    <Link to={`/moreinfo/${computer._id}`} ><button className="MoreInfoBtn">MoreInfo</button></Link>
                                </div>
                            )
                        }
                    </div>
                ))):
                (
                    <h2>Loading</h2>
                )
            }
            </div>
       
        </div>
    )
}
export default PcList;