import React,{useEffect} from 'react'

const Dashboard = () => {

  const getData= async ()=>{
    try {
      const response = await fetch('/api/v1')
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
   
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard

//the proxy is only used if our frontend fails to find the value in the client server. 
// /api/v1 is nowhere on the client side so it uses the express response (http://localhost:5000/api/v1). When you use ('/'), the frontend assumes you meant
 //(http://localhost:3000/) and not (http://localhost:5000/), so it returns the html from client/public/index.html. This is obviously not a json object so we get an error.