import React from "react";
import {Link} from 'react-router-dom'
// import styles from "./login.module.css"
import { useState ,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom' 
import {message} from 'antd'
// import Spinner from "../components/spinner";

function Login()
{
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [loading,setLoading]=useState()
    const navigate=useNavigate()

    // const handleSubmit = async (values) => {
    //     try {
    //         console.log(values)
    //       setLoading(true);
    //       console.log({email,password})
    //     //   console.log(data)
    //       await axios.post('http://localhost:8080/login', values);
    //       setLoading(false);
    //       message.success("login success");
    //     //   console.log(data)
    //     //   localStorage.setItem(
    //     //     "users",
    //     //     JSON.stringify({ ...data, password: "" })
    //     //   );
    //       navigate("/");
    //     // }
    //     } catch (error) {
    //       setLoading(false);
    //       message.error("something went wrong");
    //     }
    //   };
    const handleSubmit=(e)=>{
        try
        {
            e.preventDefault()
            setLoading(true)
            axios.post('http://localhost:8080/login',{email,password}).then(result=>{
                // console.log(result)
                if(result.data.success)
                {
                    console.log(result.data.user)
                    message.success('login succesful')
                    localStorage.setItem("user",JSON.stringify({...result.data.user,password:""}))          
            setLoading(false)
            navigate('/')
                }
                else
        {
            setLoading(false)
            message.error('incorrect username or password')
        }
            })
            
        }
        catch(err)
        {
            setLoading(false)
            message.error('something went wrong')
        }
    }

        // ).then(result=> {console.log(result)
        // if(result.data==="success")
    //     {
    //         // <Routess/>
    //         navigate('/home')
    //     }
    //     else
    //     {
    //         alert("username or password is incorrect")
    //     }
    // }).catch(err=>console.log(err))}
    // }
    useEffect(()=>{
        if(localStorage.getItem('user'))
        {
            navigate('/')
        }
    })
    return (<div className='login-box'>
        {/* {loading && <Spinner/>} */}
    <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='login-entries'>
            Username <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="username"/>
        </div>
        <div className='login-entries'>
            Password <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
        </div>
        <div className='login-wrapper'>
            <div className='login-entries'>
                <a href="#">Forgot Password?</a>
            </div>
            <div className='login-entries'>
                Don't have an account?<Link to='/register'>sign-up</Link>
            </div>
        </div>
        <div className='login-entries submit-button'>
            <input type="submit" value="Login"/>
        </div>
    </form>
</div>);
}
export default Login;