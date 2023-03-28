import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import toast from "react-hot-toast"
import axios from 'axios'
const Header = () => {

    const {isAuthenticated,setIsAuthenticated,loading,setLoading}  = useContext(Context);

    const LogoutHandler = async(e)=>{
      setLoading(true);
      try {
        await axios.get(`${server}/users/logout`,{ 
          withCredentials:true,
        });
        toast.success("Logged Out Successfully");
        setIsAuthenticated(false);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthenticated(true);
        setLoading(false);
      }
    };
  return (
  <nav className="header">
    <div>
        <h2>Todo App</h2>
    </div>
    <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {
            isAuthenticated==true ? (<button  disabled={loading} className='btn' onClick={LogoutHandler}>Logout</button>):(<Link to={"/login"}>Login</Link>)
        }
        
        
    </article>
  </nav>
  )
}

export default Header