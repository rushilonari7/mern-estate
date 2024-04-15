import React from 'react'
import {GoogleAuthProvider,  getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../Firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/UserSlice.js';
import { useNavigate } from 'react-router-dom';

function OAuth() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const handleGoogleClick=async()=> {
      
        try {
            const provider=new GoogleAuthProvider();

            const auth=getAuth(app);

            const result=await signInWithPopup(auth,provider);

            // console.log(result);
            const res=await fetch('/api/auth/google',{
              method:'POST',
              headers:{
              'Content-Type':'application/json'
              },
              body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
              })
            })
            const data=await res.json();
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            console.log("could not sign in  with google ",error);
        }
    }
  return (
    <>
    <button className='bg bg-red-700 text-white p-3 rounded-lg text uppercase hover:opacity-95' type="button" onClick={handleGoogleClick}>Continue With google</button>
    </>
  )
}

export default OAuth
