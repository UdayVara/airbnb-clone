"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { info } from "@/app/redux/features/listingFeature";
function RentInfo({previous,next}:{previous:()=>void,next:()=>void}) {
  const initData = useSelector((state)=>state.listing)
  const [data, setData] = useState<{
    guests: number;
    rooms: number;
    bathrooms: number;
  }>({ guests: initData.guests, rooms: initData.rooms, bathrooms: initData.bathrooms });

  const dispatch = useDispatch()  

  const handleNext = () =>{
    dispatch(info(data))
    next()
  }

  return (
    <>
      <div className="px-2">
        <h3 className="text-lg font-bold">
          Share Some basics about your place
        </h3>
        <h5 className="text-sm text-neutral-700">What Amenities Do You have</h5>

        <div className="mt-4 flex justify-between items-center border-b pb-3">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">Guests</h4>
            <h6 className="text-sm text-neutral-700">
              How many Guests Do You Allow.
            </h6>
          </div>
          <div className="flex items-center gap-3">
            <h4 className="border p-2 rounded-full bg-slate-50 shadow-sm hover:bg-slate-300 cursor-pointer" onClick={()=>{setData({...data,guests:data.guests+1})}}>
              <AiOutlinePlus className="" />
            </h4>
            <h4 className="text-lg">{data.guests}</h4>
            <h4 className="border p-2 rounded-full bg-slate-50 shadow-sm hover:bg-slate-300 cursor-pointer" onClick={()=>{if(data.guests === 0){return}setData({...data,guests:data.guests-1})}}>
              <AiOutlineMinus />
            </h4>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center border-b pb-3">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">Rooms</h4>
            <h6 className="text-sm text-neutral-700">
              How many Rooms do you have.
            </h6>
          </div>
          <div className="flex items-center gap-3">
            <h4 className="border p-2 rounded-full bg-slate-50 shadow-sm hover:bg-slate-300 cursor-pointer" onClick={()=>{setData({...data,rooms:data.rooms+1})}}>
              <AiOutlinePlus className="" />
            </h4>
            <h4 className="text-lg">{data.rooms}</h4>
            <h4 className="border p-2 rounded-full bg-slate-50 shadow-sm hover:bg-slate-300 cursor-pointer" onClick={()=>{if(data.rooms === 0){return}setData({...data,rooms:data.rooms-1})}}>
              <AiOutlineMinus />
            </h4>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center border-b pb-3">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">Bathrooms</h4>
            <h6 className="text-sm text-neutral-700">
              How many Bathrooms do you have.
            </h6>
          </div>
          <div className="flex items-center gap-3">
            <h4 className="border p-2 rounded-full bg-slate-50 shadow-sm hover:bg-slate-300 cursor-pointer" onClick={()=>{if(data.bathrooms === 0){return}setData({...data,bathrooms:data.bathrooms+1})}}>
              <AiOutlinePlus className="" />
            </h4>
            <h4 className="text-lg">{data.bathrooms}</h4>
            <h4 className="border p-2 rounded-full bg-slate-50 shadow-sm hover:bg-slate-300 cursor-pointer" onClick={()=>{if(data.bathrooms === 0){return}setData({...data,bathrooms:data.bathrooms-1})}}>
              <AiOutlineMinus />
            </h4>
          </div>
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
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default RentInfo;
