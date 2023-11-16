"use client"
import { photo } from '@/app/redux/features/listingFeature'
import React from 'react'
import {RiImageAddLine} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
function UploadPhoto({previous,next}:{previous:()=>void,next:()=>void}) {
  const dispatch = useDispatch()
  return (
    <>
        <div className='px-2'>
            <h4 className='text-lg font-bold '>Add Photo of Your Place.</h4>
            <h6 className='text-sm text-neutral-600'>Show Guests What Your place Looks like</h6>

            <div className='w-full h-36 border-dashed mt-2 border-2 flex flex-col items-center justify-center cursor-pointer relative'>
            <input type="file" name="" id="" className='w-full h-full  absolute opacity-0 cursor-pointer' onChange={(e)=>{
                dispatch(photo(e.target.files[0]))
            }} />
                    <RiImageAddLine className="text-4xl" />
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
            onClick={next}
          >
            Next
          </button>
        </div>
        </div>
    </>
  )
}

export default UploadPhoto