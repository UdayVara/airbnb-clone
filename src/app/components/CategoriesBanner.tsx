"use client"
import React, { useState } from 'react'
import { availableCategories } from './categories'

function CategoriesBanner({selectedCategory,updateCategory}:{selectedCategory:string,updateCategory:(label: string) => void}) {


  const handleCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {

  }
  return (
    <>
    <div className='gap-0 flex justify-start xl:justify-evenly  cursor-pointer shrink-0 w-full overflow-auto md:px-8 px-3'>

    {availableCategories.map((element,index)=>{
        return <div className={` flex flex-col  items-center hover:text-rose-600  text-md  pb-2 pt-5 mt-1   px-4 ${selectedCategory === element.label ? "text-rose-600 border-b-2 border-b-rose-600":"text-neutral-700 select-none"}`} key={index} onClick={(e)=>{
          if (selectedCategory === element.label) {
            updateCategory("")
          }else{
            updateCategory(element.label)
          }
        }}>{< element.icon />}{element.label}</div>
    })}
    </div>
    </>
  )
}

export default CategoriesBanner