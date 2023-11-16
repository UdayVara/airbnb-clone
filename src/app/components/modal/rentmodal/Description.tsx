"use client"

import { description } from "@/app/redux/features/listingFeature";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Description({previous,next}:{previous:()=>void,next:()=>void}) {
  const initData =  useSelector((state)=>state.listing)
  console.log(initData);
  const [data,updateData] = useState<{title:string,description:string}>({title:initData.title,description:initData.description})
  const dispatch = useDispatch()
  const handleChange = (e) => {
    updateData({...data,[e.target.name]:e.target.value})
  }
  const handleNext = () => {
    dispatch(description(data))
    next()
  }
  return (
    <>
      <div className="px-2">
        <h3 className="font-bold text-lg">
          How Would You Describe Your Place.
        </h3>
        <h6 className="text-sm text-neutral-600">
          Short and Sweet which suits best for your place
        </h6>
        <div className="relative mt-4">
          <input
            type="text"
            name="title"
            id="title"
            className=" w-full text-lg py-2 pt-5
                  pl-2 focus:pl-3 transition-all duration-100 shadow border border-zinc-500 rounded focus:outline-none focus:border-rose-600 focus:border-2 focus:shadow-sm
                   focus:shadow-rose-700 px-2    peer"
            placeholder=""
            onChange={handleChange}
            value={data.title}
          />
          <label
            htmlFor="title"
            className=" pt-1 absolute left-2   text-md transition-all duration-100 
                  peer-placeholder-shown:translate-y-3
                  peer-focus:scale-90
                  peer-focus:-translate-y-1"
          >
            Title
          </label>
        </div>
        <div className="relative mt-4">
          <textarea
            name="description"
            id="descirption"
            className=" w-full text-lg py-2 pt-5
                  pl-2 focus:pl-3 transition-all duration-100 shadow border border-zinc-500 rounded focus:outline-none focus:border-rose-600 focus:border-2 focus:shadow-sm
                   focus:shadow-rose-700 px-2    peer"
            placeholder=""
            onChange={handleChange}
            value={data.description}
          />
          <label
            htmlFor="descrition"
            className=" pt-1 absolute left-2   text-md transition-all duration-100 
                  peer-placeholder-shown:translate-y-3
                  peer-focus:scale-90
                  peer-focus:-translate-y-1"
          >
            Description
          </label>
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

export default Description;
