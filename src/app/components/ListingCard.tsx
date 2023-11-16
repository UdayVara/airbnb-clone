"use client"
import React, { useState } from 'react'
import {AiFillHeart} from "react-icons/ai"
import { useRouter } from 'next/navigation'

function ListingCard({listing}:{listing:any}) { 
  const router = useRouter()
  const [isFav,setFav]  = useState<boolean>(false)
  return (
    <div className='cursor-pointer z-20 overflow-hidden relative mx-auto' onClick={()=>{router.push(`/${listing.id}`)}}>
        <img src={`http://localhost:5000/Images/${listing.imageUrl}`} alt="image not found" className='aspect-square rounded-xl hover:scale-x-110 hover:rounded hover:py-1 hover:scale-y-105 transition duration-200 object-center z-0 md:max-h-[60vh] max-h-[50vh]' />
        <div className='mt-2 pl-1 z-10'>
          <h3 className='text-lg font-bold'>{listing.title},{listing.location}</h3>
          <h5>{listing.category}</h5>
          <h6 className='font-bold text-lg'>$ {listing.price}, Per Night</h6>
        </div>
        <span onClick={()=>{setFav(!isFav)}}>
      <AiFillHeart className={`text-xl absolute right-3 top-2 cursor-pointer ${isFav?"text-rose-600":"text-white opacity-100"}`}/>
      </span>
    </div>
  )
}

export default ListingCard