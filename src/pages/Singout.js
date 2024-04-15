import React, { useState } from 'react'
import toast from 'react-hot-toast';
import  {Link, useNavigate}  from 'react-router-dom';
import OAuth from '../Componenets/OAuth';

function Singout() {
  const[formData,setFormData]=useState({})
  const[error,setError]=useState(null);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  function  handleChange (e) {
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=> {
    e.preventDefault();
    try {
      setLoading(true)
    const res=await fetch("/api/auth/Singout",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    console.log(data);
    if (data.success===false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    // console.log("created Successully")
    navigate("/Singin");
    toast.message("goto singin")

    } catch (error) {
      setLoading(false);
      setError(error.message);
    
    }
    

  //  toast.success("nice ")
  //  console.log(formData)
  }
  console.log(formData)

  return (
  <>
  <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>
      SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        type="text" 
        placeholder='username' 
        className='border p-3 rounded-lg' 
        id='name'
        onChange={handleChange}/>
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
      className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?"loading...":"SignUp"}</button>
      <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/Singin">
          <span className='text-blue-700 hover:underline'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
  </div>
  </>
  )
}

export default Singout
