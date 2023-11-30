import React, { useEffect, useState } from 'react'
import {useNavigate } from "react-router-dom";
import "./searchBar.css"
const backEndUrl = "http://192.168.189.137:3000"

const RunningTask = (props) => {
    
    const navigate = useNavigate()
    const deviceId=props.deviceId.objectId
    const userName=localStorage.getItem('techshillausername')
    const properties = props?.properties
    let localUrl= properties?.res?.url
    // localUrl='http://192.168.189.86:8080'
    const token=localStorage.getItem('techshillaauthtoken')

    const [listOfTasks, setListOfTasks] = useState([
    ])
    const [tempListOfTask ,setTempListOfTasks] = useState([
       
    ])

    const loadTasks = async() =>{
        try {
            const data={
                userName: userName,
                url: localUrl
            }
            const options={
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "auth-token": token,
                }, 
                body: JSON.stringify(data)
            }
          
            let res= await fetch(backEndUrl+"/api/devices/loadtasks/"+deviceId, options)
            res= await res.json()
            if(res && res.status === 'ok')
           { 
                delete res.processes[0]
                delete res.processes[1] 
                setListOfTasks(res.processes)
                setTempListOfTasks(res.processes)
           }
            else
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const terminateTask= async (taskName) =>{

        console.log("Terminating", taskName)
        //API delete request
        
        const options={
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body:JSON.stringify({
                userName: userName,
                url: localUrl,
                task: taskName
            })
        }
        const deletebtn = document.querySelector('#delete')
        deletebtn.style.visibility = 'none'
        
        
        let res= await fetch(backEndUrl+"/api/devices/taskkill/"+deviceId, options)
        res = await res.json()

       setTimeout(()=>
       {
        if(res.status === 'ok')
        loadTasks()
        else
        console.log(res.error)

        deletebtn.style.visibility='visible'
       },1000)
    }


    useEffect(()=> {loadTasks()},[])
    const  handleSearchBar = (e)=>
    { 
         const val = e.target.value
         const result= listOfTasks.filter((task)=>
         {
           const taskName = task.processName
           return taskName.toUpperCase().includes(val.toUpperCase())
           
         })
         setTempListOfTasks(result)

    }
    return (
        <>
        <div className="searchBar">
          <input type = 'text' id = 'searchBox' className='searchBox' placeholder='Search task' onChange={(e)=>handleSearchBar(e)}></input>


        </div>
        <div>
            {tempListOfTask?.map((props,index) => (
                <div className="functionNameBlock" key={index}>
                    <span className="details-box">
                        <span style={{display:"flex"}} className="runningTaskName" >{props.processName}</span>
                        <span className="momary-use-details">{props.memoryUsage}</span>
                    </span>
                    <span className="material-symbols-outlined delete-btn" onClick = {()=>{terminateTask(props.processName)}} id="delete">delete</span>
                </div>
            ))
            }
            </div>

        </>
    )
    
}
export default RunningTask;