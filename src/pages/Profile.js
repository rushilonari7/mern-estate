import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../Firebase';
import { updateUserStart,updateUserSuccess,updateUserFailuer, deleteUserStart, deleteUserSuccess, deleteUserFailuer, signoutStart, signoutFailuer, signoutSuccess } from '../redux/user/UserSlice';
import  {Link, useNavigate}  from 'react-router-dom';
function Profile() {
  const{currentUser,loading,error}=useSelector(state=>state.user);
  const fileRef=useRef(null);
  const [file,setFile]=useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [showListingError,setShowListingError]=useState(false);
  const[userListing,setUserListing]=useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  // console.log(file)
  console.log(formData);

  // console.log(filePerc);
  // console.log(fileUploadError);



  // firebase storge
  // allow read;
  // allow write: if 
  // request.resource.size<2*1024*1024&&
  // request.resource.contentType.match('image/.*')
  useEffect(()=>{
    if (file) {
      handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);
  
    uploadTask.on('state_changed',(snapshot)=>{
     const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    //  console.log('Upload is'+progress+'% done')
     setFilePerc(Math.random(progress));
    },

  (error)=>{
       setFileUploadError(true)
       console.log(Error)
    },

  ()=>{
      getDownloadURL(uploadTask.snapshot.ref).
      then((downloadURL)=>{
        setFormData({...formData,avatar:downloadURL});
        // console.log(downLoadURL)
      })
    }
    );

  }
  function changHandler(e) {
    // e.preventDefault();
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  
  const handleSubmit=async(e)=>{
   e.preventDefault();
   try {
    dispatch(updateUserStart())
    const res=await fetch(`/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    });
    const data=await res.json();
    // console.log(data);
    if (data.success=== false) {
     dispatch(updateUserFailuer(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true)
   } catch (error) {
    dispatch(updateUserFailuer(error.message))
   }
  }

  const handleDeleteUser=()=>{
    try {
      dispatch(deleteUserStart());
      const res=fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      });
      const data=res.json();
      if (data.success === false) {
        dispatch(deleteUserFailuer(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    navigate("/Singin");
    } catch (error) {
      dispatch(deleteUserFailuer(error.message))
    }
  }

  const handleSignOutUser=async()=>{
    try {
      dispatch(signoutStart())
      const res=await fetch('/api/auth/Singout1');
      const data=res.json();
      if (data.success===false) {
        dispatch(signoutFailuer(data.message));
        return;
      }
      dispatch(signoutSuccess(data))
      navigate('/Singin')
    } catch (error) {
      dispatch(signoutFailuer(error.message))
    }
  }
  const handleShowListing=async()=>{
    try {
      setShowListingError(false);
      const res=await fetch(`/api/user/listing/${currentUser._id}`);
      const data=await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
       setShowListingError(true);
    }
  };

  const handleListingDelete=async(listingId)=>{
    try {
      const res=await fetch(`/api/listing/delete/${listingId}`,{
        method:'DELETE'
      });
      const data=await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListing((prev)=>
       prev.filter((listing)=>listing._id!==listingId))
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
 <>
 <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center 
    my-7'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input onChange={(e)=>{setFile(e.target.files[0])}} type="file" ref={fileRef} hidden accept='image/*' />
      <img onClick={()=>fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
      src={formData.avatar||currentUser.avatar} alt="profile" />
      <p className='text-sm self-center'>
        {fileUploadError?(<span className='text-red-700'>Error Image Upload(Image must be 2 mb)</span>
        ):filePerc>0 && filePerc<100 ?(<span className='text-slate-700'>{`uploading ${filePerc}%`}</span>
        ):filePerc===100?(<span className='text-green-600'>Image Uploaded Successfully</span>
        ):(
          " "
        )}
      </p>
      <input
       type='text' 
       id='name' 
       placeholder='Username'
       className='border p-3 rounded-lg'
       onChange={changHandler}/>

       <input 
       type='email' 
       id='email' 
       placeholder='Email'
       className='border p-3 rounded-lg'
       onChange={changHandler}/>

       <input 
       type='Password' 
       id='password'
       placeholder='Password'
       className='border p-3 rounded-lg'
       onChange={changHandler}/>
       <button disabled={loading} className='bg-slate-700 text-white rounded-lg
       p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...':'UPDATE'}</button>
         <Link className='bg-green-700 p-3 text-white rounded-lg uppercase text-center hover:opacity-95' to={'/create-listing'}>
         Create Listing
         </Link>

    </form>
    <div className='flex justify-between mt-5'>
      <span  onClick={handleDeleteUser} className='text-red-700 cursor-pointer hover:underline'>
        Delete Account!</span>
        <span onClick={handleSignOutUser} className='text-red-700 cursor-pointer hover:underline'>
        Sign Out!</span>
    </div>
    {/* <p className='text-red-700 mt-5'>{error?error:' '}</p> */}
    <p className='text-green-700 mt-5'>{updateSuccess? 'User Is Updated Successfully ':' '}</p>
    <button onClick={handleShowListing} className='text-green-700 w-full hover:underline'>Show listing</button>
    <p className='text-red-700 mt-5'>{showListingError?'Error Showing Listing':''}</p>
    {userListing && userListing.length>0 &&
    <div className='flex flex-col gap-4'> 
      <h1 className='text-center mt-7 text-2xl font-semibold '>Your Listing</h1>
   {userListing.map((listing)=>(

      <div className='border rounded-lg p-3 flex justify-between items-center gap-4' key={listing._id}>
        <Link to={`/listing/${listing._id}`}>
           <img src={listing.imageUrls[0]} alt="listing cover" className='w-16 h-16 object-contain'/>
        </Link>
        <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`}>
        <p>{listing.name}</p>
        </Link>
        <div className='flex flex-col items-center'>
          <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase hover:underline'>Delete</button>
          <Link to={`/update-listing/${listing._id}`}>
          <button className='text-green-700 uppercase hover:underline'>Edit</button>
          </Link>
        </div>
        </div>
    ))}
    </div>}
 </div>
 </>
  )
}

export default Profile
