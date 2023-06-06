import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/User';
import { UserIcon } from '@heroicons/react/24/outline';


function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state)=> state.user.isUserLoggedIn);
  
  useEffect(()=>{
    if (!isUserLoggedIn) {
      navigate("/")
    }
  })
  const handleLogout = ()=>{
    localStorage.removeItem("auth-token")
    dispatch(logout({}));
    
  }
  return (
    <div className="flex flex-col">
      <div className="flex h-[45vh] bg-teal-700">
        <div className="flex-[0.30] flex justify-center items-center">
          <div className="bg-white rounded-full w-56 h-56 border">
            <UserIcon className="p-10"/>
          </div>
        </div>
        <div className="flex-[0.50] text-white flex flex-col gap-4 font-medium text=lg mt-10">
          <h1 className="font-bold text-2xl py-10">Abdul Moeez</h1>
          <h1>Email : abdulmoeez0812@gmail.com</h1>
          <h1>Phone # 03087030889</h1>
          <h1>Address: Johar town b1 block, lahore Pakistan</h1>

        </div>
        <div className="flex-[0.20] flex justify-center items-start pt-4 gap-4">
          <button className="bg-[#9E9E9E] p-2 w-28 text-white font-semibold rounded hover:bg-black" onClick={handleLogout}>Logout</button>
          <button className="bg-[#9E9E9E] p-2 w-28 rounded text-white font-semibold hover:bg-black" >Edit Profile</button>

        </div>
      </div>
      <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Favorites {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No items in Favorite</div>
        <hr />
      </div>
      <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Your Products {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No Items to sell</div>
        <hr />
      </div>
      <div className="px-10 bg-slate-100/90 rounded py-3">
        <h1 className="text-2xl font-semibold">Orders {">"}</h1>
        <hr />
        <div className="h-24 text-lg font-medium flex justify-center items-center">No Orders Placed Yet</div>
        <hr />
      </div>
    </div>
  )
}

export default UserProfile