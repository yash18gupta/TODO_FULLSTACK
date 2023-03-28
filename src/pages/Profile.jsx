import React, { useContext,useState,useEffect } from "react";
import { Context, server } from "../main";
import Loader from "../components/Loader";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}  = useContext(Context);
  const [user, setUser] = useState("");

  useEffect(() => {
    setLoading(true);
      axios.get(`${server}/users/me`,{
      withCredentials:true,
     }).then((res)=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
     }).catch((e)=>{
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
     })
  
  }, [])


  return loading ? (
    <Loader />
  ) : isAuthenticated ? (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  ):
  (
    <Navigate to={"/login"} />
  );
  
};

export default Profile;