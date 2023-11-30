const backEndUrl = 'http://192.168.189.137:3000'

const shuthiber = async (localUrl, task, deviceId) =>{
    try {
        const token=localStorage.getItem('techshillaauthtoken')
        const userName=localStorage.getItem('techshillausername')

        const options={
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token": token
            },
            body:JSON.stringify({
                userName: userName,
                url: localUrl,
                task: task 
            })
        }
       console.log(options, backEndUrl+'/api/devices/shuthiber/'+deviceId)
        let res= await fetch(backEndUrl+'/api/devices/shuthiber/'+deviceId, options)
        res= await res.json()
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {shuthiber}