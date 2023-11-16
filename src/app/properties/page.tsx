"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

type listingType = {
  imageUrl: string,
  id:string,
  title:string,
  location:string,
  category:string,
  price:number
}
function Page() {
  const [listing, setListing] = useState<listingType[]>([]);
  const loginInfo = useSelector((state) => state.login);
  const getListing = async () => {
    const data = await fetch("http://localhost:5000/listing/getmylistings", {
      method: "GET",
      headers: {
        "auth-token": loginInfo.token,
      },
    });
    const parsedData = await data.json();

    if (parsedData.success) {
      setListing(parsedData.properties);
    } else {
      toast.error("No Properties Exist.");
    }
  };

  const deleteListing = async(id: string) => {
    const data = await fetch("http://localhost:5000/listing/remove",{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "auth-token":loginInfo.token
      },body:JSON.stringify({
        listingId:id
      })
    })
    const parsedData = await data.json()

    if (parsedData.success) {
      toast.success(parsedData.message)
      getListing()
    } else {
      toast.error(parsedData.message)
    }
  }

  useEffect(() => {
    getListing();
  }, [loginInfo]);
  return (
    <>
    
      <div className="container mx-auto mt-5">
        <h4 className="text-xl font-bold">My Properties</h4>
        <h6 className="text-md text-neutral-500">List of Your Properties</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
        {listing.length === 0 && (
            <>
              <Skeleton count={12} />
              <Skeleton count={12} />
              <Skeleton count={12} />
              <Skeleton count={12} />
              <Skeleton count={12} />
              <Skeleton count={12} />
            </>
          )}
          {listing.map((listing, index) => {
            return (
              <>
                <div className="cursor-pointer z-20 overflow-hidden relative mx-auto">
                  <img
                    src={`http://localhost:5000/Images/${listing.imageUrl}`}
                    alt="image not found"
                    className="aspect-square rounded-xl hover:scale-x-110 hover:rounded hover:py-1 hover:scale-y-105 transition duration-200 object-center z-0 md:max-h-[60vh] max-h-[50vh]"
                  />
                  <div className="mt-2 pl-1 z-10">
                    <h3 className="text-lg font-bold">
                      {listing.title},{listing.location}
                    </h3>
                    <h5>{listing.category}</h5>
                    <h6 className="font-bold text-lg">
                      $ {listing.price}, Per Night
                    </h6>
                  </div>

                  <button className="mt-0 bg-rose-500 hover:bg-rose-600 text-white w-full text-lg py-2  rounded-3xl cursor-pointer" onClick={()=>{deleteListing(listing.id)}}>
                    Delete Property
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Page;
