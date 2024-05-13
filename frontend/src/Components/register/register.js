import React, { useState,useEffect } from 'react'
// import styles from "./signup.module.css"
import axios from 'axios'
import {message} from 'antd'
// import Spinner from '../components/spinner'
// import 'index.css'
import {useNavigate,Link} from 'react-router-dom' 

function Register() {

    const [first_name,setFirstName]=useState()
    const [last_name,setLastName]=useState()
    const [email,setEmail]=useState()
    const [dob,setDob]=useState()
    const [password,setPassword]=useState()
    const [loading, setLoading]=useState()
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        try
        {
            e.preventDefault()
            setLoading(true)
            axios.post('http://localhost:8080/register',{first_name,last_name,email,dob,password}).then(result=>{
                if(result.data==='user exist')
                {
                    setLoading(false)
                    message.error("user already exist")
                }
                else{
                message.success('Registration Successful')
            setLoading(false)
            navigate('/login')
        }})
        }
        catch(err)
        {
            setLoading(false)
            message.error("invalid username or password")
        }
    }

    //prevent for login user
    useEffect(()=>{
        if(localStorage.getItem('user'))
        {
            navigate('/')
        }
    })

  return (
    <div className='register-box'>
        {/* {loading && <Spinner/>} */}
    <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className='register-entries'>
            First Name <input type="text" onChange={(e)=>setFirstName(e.target.value)} placeholder="first name" required/>
        </div>
        <div className='register-entries'>
            Last Name <input type="text" onChange={(e)=>setLastName(e.target.value)} placeholder="last name" required/>
        </div>
        <div className='register-entries'>
            Username <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="username" required/>
        </div>
        <div className='register-entries'>
            Date of Birth <input type="date" onChange={(e)=>setDob(e.target.value)} placeholder="password" required/>
        </div>
        <div className='register-entries'>
            Set Password <input type="text" id="pass" onChange={(e)=>setPassword(e.target.value)} placeholder="password" required/>
        </div>
        <div className='register-entries'>
                Already have an account?<Link to='/login'>login</Link>
            </div>
        <div className='register-entries submit-button'>
            <input type="submit" value="Register"/>
        </div>
    </form>
</div>
  )
}

export default Register
