"use client";
import CategoriesBanner from "./components/CategoriesBanner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListingCard from "./components/ListingCard";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [listings,updateListings] = useState([])
  const getData = async() => {
    const data = await fetch("http://localhost:5000/listing/get")
    const parsedData = await data.json()
    
    if (!parsedData.success) {
      return toast.error("Server is not Running.")
    }

    updateListings(parsedData.listings)
  }
console.log(listings);

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <CategoriesBanner
        selectedCategory={selectedCategory}
        updateCategory={setSelectedCategory}
      />

      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8  px-6">
        {listings.length === 0 && <><Skeleton count={12}/><Skeleton count={12}/><Skeleton count={12}/><Skeleton count={12}/><Skeleton count={12}/><Skeleton count={12}/></>}
        {
          listings.map((element,index)=>{
            return <ListingCard listing={element} key={index}  /> 
          })
        }
      </div>
    </>
  );
}
