import React, { useState } from 'react'
import toast from 'react-hot-toast';
import  {Link, useNavigate}  from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailuer } from '../redux/user/UserSlice';
import OAuth from '../Componenets/OAuth';

function Singin() {
  const[formData,setFormData]=useState({})
 const {loading,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  function  handleChange (e) {
    
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=> {
    e.preventDefault();
    try {
    dispatch(signInStart());
    const res=await fetch("/api/auth/Signin",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    console.log(data);
    if (data.success===false) {
     dispatch(signInFailuer(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    // console.log("created Successully")
    navigate("/");
    // toast.message("goto singin")

    } catch (error) {
    dispatch(signInFailuer(error.message));
    }
    

  //  toast.success("nice ")
  //  console.log(formData)
  }
  console.log(formData)

  return (
  <>
  <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>
      SignIn</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        type="text" 
        placeholder='email' 
        className='border p-3 rounded-lg' 
        id='email'
        onChange={handleChange}/>
        <input 
        type="text" 
        placeholder='password' 
        className='border p-3 rounded-lg' 
        id='password'
        onChange={handleChange}/><br />
        <button 
       disabled={loading}
      className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?"loading...":"SignIn"}</button>
      <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account?</p>
        <Link to="/Singout">
          <span className='text-blue-700 hover:underline'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
  </div>
  </>
  )
}

export default Singin;
