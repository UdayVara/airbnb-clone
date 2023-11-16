"use client";

import React, { useState } from "react";
import { availableCategories } from "../../categories";
import { useDispatch, useSelector } from "react-redux";
import { category } from "@/app/redux/features/listingFeature";

function ChooseCategory({next}:{next:()=>void}) {
  const initialCategory = useSelector((state)=>state.listing.category) as string
  const [selectedCategory,setSelectedCategory] = useState<string>(initialCategory)
  const dispatch = useDispatch()
  const handleNext = ()=> {
    dispatch(category(selectedCategory))
    next()
  }
  return (
    <>
    <h4 className="text-md ml-3 text-lg mt-2 font-bold">Choose Which Suits best for you.</h4>
    <h4 className="ml-3 text-neutral-700">Select Category</h4>
      <div className="grid grid-cols-2 py-3 h-[400px] overflow-y-scroll">
        {availableCategories.map((element, index) => {
          return (
            <>
            <div className="px-2  my-1 shadow" onClick={()=>{setSelectedCategory(element.label)}}>

              <div className={`flex justify-center rounded-md flex-col items-center  border max-w[20px] hover:text-rose-600 cursor-pointer py-4 ${selectedCategory === element.label?"text-rose-600 border-rose-600":""}`}>
                {<element.icon />}
                {element.label}
              </div>
            </div>
            </>
          );
        })}
      </div>
        <button
          className="w-full py-2 text-lg text-white rounded-3xl bg-rose-500 hover:bg-rose-600 my-2 mt-4 "
          onClick={handleNext}
        >
          Continue
        </button>
    </>
  );
}

export default ChooseCategory;
