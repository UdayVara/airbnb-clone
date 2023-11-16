"use client";

import { compareDesc } from "date-fns";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Page(): React.ReactNode {
  const router = useRouter();
  const loginInfo = useSelector((state) => state.login);
  console.log(loginInfo);
  const [trips, setTrips] = useState([]);
  const [listings, setListings] = useState([]);
  const getTrips = async () => {
    const data = await fetch("http://localhost:5000/reservation/gettrips", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": loginInfo.token,
      },
    });
    const parsedData = await data.json();

    if (parsedData.success) {
      setTrips(parsedData.trips);
      setListings(parsedData.listings);
      console.log(parsedData);
    } else {
      toast.error(parsedData.message);
    }
  };

  const cancelReservation = async (id) => {
    console.log(id);

    const data = await fetch("http://localhost:5000/reservation/cancel", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": loginInfo.token,
      },
      body: JSON.stringify({
        reservationId: id,
      }),
    });
    const parsedData = await data.json();
    console.log(parsedData);

    if (parsedData.success) {
      toast.success("Cancelled Successfully.");
      // router.refresh()
      getTrips();
    } else {
      toast.error(parsedData.message);
    }
  };

  useEffect(() => {
    getTrips();
  }, [loginInfo]);
  return (
    <>
      <div className="container mx-auto mt-5">
        <h4 className="text-2xl font-semibold">My trips</h4>
        <h6 className="text-md text-neutral-500">
          Take a look where have you been and where you are about to go.
        </h6>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5 mb-12">
          {trips.length === 0 && (
            <>
              <Skeleton count={12} />
              <Skeleton count={12} />
              <Skeleton count={12} />
              <Skeleton count={12} />
              <Skeleton count={12} />
              <Skeleton count={12} />
            </>
          )}
          {trips.map((trip, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer overflow-hidden relative my-5"
              >
                <img
                  src={`http://localhost:5000/Images/${listings[index].imageUrl}`}
                  alt="image not found"
                  className="aspect-square rounded-xl hover:scale-x-110 hover:rounded hover:py-1 hover:scale-y-105 transition duration-200 object-center  max-h-[40vh]"
                />
                <div className="mt-2 pl-1 z-10">
                  <h3 className="text-lg font-bold">
                    {listings[index].title},{listings[index].location}
                  </h3>
                  <h5>
                    {moment(trip.startDate).format("D-MM-YYYY")} To{" "}
                    {moment(trip.endDate).format("D-MM-YYYY")}
                  </h5>

                  <h6 className="font-bold text-lg">$ {trip.totalPrice}</h6>
                </div>

                {new Date(trip.startDate) > new Date() === true && (
                  <button
                    className="w-full bg-rose-600  block mx-auto rounded-3xl text-white py-2 hover:bg-rose-700"
                    onClick={() => {
                      cancelReservation(trip.id);
                    }}
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Page;
