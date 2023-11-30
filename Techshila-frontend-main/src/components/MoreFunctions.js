import React, { useEffect, useState } from 'react'
import { Link,useLocation, useParams, useNavigate } from "react-router-dom";
import RunningTask from "./RunningTask";
import { shuthiber } from '../pages/shutdownhiberfunctions';
const backEndUrl='http://192.168.189.137:3000'

const MoreFunctions = () => {
    const navigate=useNavigate()
    let deviceId=useParams()
    const location = useLocation();
    const [battery, setBattery] = useState();
    const [properties, setproperties] = useState()
    const RefreshPage =()=>{
        window.location.reload()
    }
    
    const handleShutHiber = async (url, task) =>{
        try {
           const res=  await shuthiber(url, task, deviceId.objectId)
           if(res.status === 'ok')
                navigate('/')
            else
                console.log(res.error)
        } catch (error) {
            console.log(error)   
        }        
    }

    const loadPage =async () =>{
        try {
            const data={
                userName: localStorage.getItem('techshillausername')
            }
            const token=localStorage.getItem('techshillaauthtoken')
    
            const options={
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "auth-token": token

                },
                body: JSON.stringify(data)
            }
            const urlOfHit=backEndUrl+"/api/devices/getdetailpc/"+deviceId.objectId
            const response = await fetch(urlOfHit, options)
            const res= await response.json()
            if(res && res.error==="Device Not Found")
                navigate('/')
            if(res){
                setproperties({res})
                await loadBattery({res})
            }
            
        } catch (error) {
            console.log(error)
            navigate('/')
        }
    }

    const loadBattery = async(properties) =>{
        try {
            if(!properties)
                return
            const data={
                userName: localStorage.getItem('techshillausername'),
                url: properties.res?.url
            }
            const token=localStorage.getItem('techshillaauthtoken')
    
            const options={
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "auth-token": token
    
                },
                body: JSON.stringify(data)
            }
            const urlOfHit=backEndUrl+"/api/devices/battery/"+deviceId.objectId
            const response = await fetch(urlOfHit, options)
            const res= await response.json()
            if(res.status==='ok')
                setBattery(res)
        } catch (error) {
            console.log('cant load battery')
        }
       
    }

    useEffect(()=>{
        loadPage()
    }, [])


if(properties != null && battery!=null)

    return (
            <div className="morefunctions">
            <div className="pc-details">
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <span className="material-symbols-outlined computer-icon">computer</span>
                    <span className="Desktop-Name" >{properties.res?.deviceName}</span>
                </div>
                <div className="shutdown-hybernate-Btn">
                    <button className="common-func-btn" onClick={()=>{handleShutHiber(properties.res?.url, "shutdown")}}><span className="material-symbols-outlined">power_settings_new</span></button>
                    <button className="common-func-btn hibernate-btn" onClick={()=>{handleShutHiber(properties.res?.url, "hibernate")}}><span className="material-symbols-outlined">error</span></button>
                </div>
            </div>
            <div className="pcfunctions">
            <div className="batterydiv">
                <span className="material-symbols-outlined battery-icon">battery_horiz_075</span>
                <div>{battery.battery}{(battery.charging==='2'?"%  charging":"%")}</div>
            </div>
            <span className="material-symbols-outlined refresh-btn" onClick={RefreshPage}>refresh</span>
                <div className="allpcfunc">
                    
                    <RunningTask deviceId={deviceId} properties={properties}/>
                </div>
            </div>
        </div>
    )
    else
    {
        return (<div>LOADING</div>)
    }
}

export default MoreFunctions;