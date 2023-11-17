const changestatebtn = document.getElementById('switch')
const dashboard = document.querySelector('.Dashboard')
const logoutbtn = document.getElementById('logout-btn')
const deviceNameNav = document.getElementById('deviceNameNav')
const userName = localStorage.getItem('userName')
 const jwt = localStorage.getItem('jwt')
 const deviceID = localStorage.getItem('deviceID')
 const deviceName = localStorage.getItem('deviceName')
 const statsDiv = document.querySelector('#status')
 const mainServerUrl = "http://192.168.189.137:3000"
changestatebtn.checked = true
dashboard.classList.toggle('Dashboard-toggle')
deviceNameNav.innerHTML =`#${deviceName} `

 changestatebtn.addEventListener('change',async(event)=>
 {
    try{
    
    const data ={
        'deviceState' : changestatebtn.checked ? 'on' : 'off'

       }
     
       dashboard.classList.toggle('Dashboard-toggle')
       let statsDivVal = statsDiv.innerHTML
       if(statsDivVal === 'ONLINE')
       statsDivVal = 'OFFLINE'
       else
       statsDivVal = 'ONLINE'

       statsDiv.innerHTML = statsDivVal
       



    const reqObject = {
       method : 'POST',
       headers : {
       'content-type' : 'application/json',
        'auth-token': jwt
       },
       body : JSON.stringify(data)
    }
    
 
  
     const res = await fetch('/dashboard',reqObject)
}
catch(err)
{
    console.log('err in toggle ', err)
}



 })

 logoutbtn.addEventListener('click',async(event)=>
 {
  try{
    const data = {
    'userName' : userName
     }
     let reqObject = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'auth-token' : jwt

            },
            body: JSON.stringify(data)



        }
  let res = await fetch(`${mainServerUrl}/api/devices/delete/${deviceID}`, reqObject)
  res = await res.json()
    localStorage.removeItem('jwt')
    localStorage.removeItem('userName')
    localStorage.removeItem('deviceID')
    window.location ='/login'


 }
 catch(err)
 {
    console.log('error in log out', err)
 }
})