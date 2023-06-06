import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Search({onPressCLose}) {
    const [search,setSearch] = useState("")
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };
    const handleClick = (e)=>{
        e.preventDefault();
        if (search===""||search===" ") {
            toast("Please enter a valid term!")
        }
        else{
            navigate(`/search/${search}`)
        }
    }
  return (
    <div className="bg-black/40 z-[100] flex justify-center fixed top-0 left-0 right-0 bottom-0">
        <div className="py-5 w-[50%] h-[40%] bg-white rounded-lg mt-32 flex flex-col justify-around items-center relative">
            <div className="absolute rounded-full bg-red-500 py-2 px-4 text-white font-bold -top-4 -right-5 select-none cursor-pointer" onClick={onPressCLose}>
                X
            </div>
            <div className="w-full flex items-center justify-center gap-2">
                <input type="search" name="search" id="search" placeholder='Search' value={search} onChange={handleInputChange} className="w-[70%] p-3 rounded-xl border-[2px] outline-none border-black/40  focus:border-black"/>
                <button onClick={handleClick} className="py-3 px-5 bg-black/70 text-white font-medium rounded-lg hover:bg-black">Search</button>
            </div>
            <p className="font-bold text-xl">OR</p>
            <div className="flex flex-col gap-3 justify-center items-center">
                <p className="font-medium text-lg tracking-wider">Search Using Image</p>
                <button className="py-3 px-5 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-600">Upload Image</button>

            </div>
        </div>
    </div>
  )
}

export default Search