import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import {Context, server} from "../main"
import toast from "react-hot-toast"
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}  = useContext(Context);

  const submitHandler = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/users/login`,{
        email,password,
      },{
        headers:{
          "Content-Type" : "application/json"
        },
        withCredentials:true,
      })
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  if(isAuthenticated) {
    return (
      <Navigate to={"/"}/>
    )
  }
  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <input value={email} type={"email"} required placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          <input value={password} type={"password"} required placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>

          <button disabled={loading} type='submit'>Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login