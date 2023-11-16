"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { empty, price } from '@/app/redux/features/listingFeature'
import {toast }from "react-toastify"
import { closeRentModal } from '@/app/redux/features/rentModalFeature'



function Price({previous,reset}:{previous:()=>void,reset:()=>void}) {
  const [price1,setPrice1] = useState<number>(0)
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.listing)
  const loginInfo = useSelector((state)=>state.login)
  const handleSubmit = () => {
    const params = price1 > 0 ? price1 : 0
    dispatch(price(params))
    addProperty()
  }
  const addProperty = async() => {
    const listingdata = new FormData()
    listingdata.append("title",data.title)
    listingdata.append("description",data.description)
    listingdata.append("category",data.category)
    listingdata.append("image",data.photo)
    listingdata.append("location",data.location)
    listingdata.append("guest",data.guests)
    listingdata.append("room",data.rooms)
    listingdata.append("bathroom",data.bathrooms)
    listingdata.append("price",data.price)


    const getData = await fetch("http://localhost:5000/listing/add",{
      method:"POST",
      headers:{
        "auth-token":loginInfo.token,
      },
      body:listingdata
    })
    const parsedData = await getData.json()

    if (parsedData.success) {
      toast.success(parsedData.message)
      dispatch(closeRentModal())
      dispatch(empty())
      reset()
      window.location.reload()
    } else {
      toast.error(parsedData.message)
    }
  }
  console.log(data);
  return (
   <>
    <div className='px-2'>
        <h4 className='font-bold text-lg'>Now, Set your price</h4>
        <h6 className='text-sm text-neutral-600'>How Much Do you Charge per night</h6>
        <div className='flex mt-6'>
            <label htmlFor="price" className='text-lg px-3 py-1 border-2'>$</label>
            <input type="number" id='price' name='price' className='border w-full text-lg hover:outline-none pl-2 focus:outline-none  focus-visible:border-[3px] focus-visible:border-rose-600 '  placeholder='Price' onChange={(e)=>{setPrice1(parseInt(e.target.value))}} />
        </div>

        <div className="flex gap-5 mt-5 justify-between ">
          <button
            className=" grow  bg-rose-600  py-2 text-lg rounded-lg text-white"
            onClick={previous}
          >
            Previous
          </button>
          <button
            className=" grow  bg-rose-600 py-2  text-lg rounded-lg text-white"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
    </div>
   </>
  )
}

export default Price