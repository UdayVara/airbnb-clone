"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { eachDayOfInterval } from "date-fns";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function Hello({ params }: { params: { id: string } }) {
  const initialDate = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const router  = useRouter()
  const [listing, setListing] = useState<{imageUrl:string,price:number,id:string}>({imageUrl:"",price:0,id:""});
  const [user, setUser] = useState("");
  const [mount, setMount] = useState<boolean>(false);
  const [dataRange, setDataRange] = useState(initialDate);
  const [disableDates, setDisableDates] = useState<Date[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const userInfo = useSelector((state) => state.login);

  const getData = async () => {
    const data = await fetch(`http://localhost:5000/listing/get/${params.id}`);
    const parsedData = await data.json();

    console.log(parsedData);
    if (parsedData.success) {
      setListing(parsedData.listing);
      setUser(parsedData.hostedby);
      let dates = [];
      const reservations = parsedData.reservations;

      for (let index = 0; index < reservations.length; index++) {
        const range = eachDayOfInterval({
          start: new Date(reservations[index].startDate),
          end: new Date(reservations[index].endDate),
        });
        
        for (let index = 0; index < range.length; index++) {
          dates.push(range[index])
        }
      }

      setDisableDates(dates);
    } else {
      toast.error("Invalid URL");
    }
  };

  const handleChange = (value) => {
    setDataRange(value.selection);

    const arr = eachDayOfInterval({
      start: value.selection.startDate,
      end: value.selection.endDate,
    });
    setTotalPrice(arr.length * listing.price);
  };

  const reserveNow = async () => {
    if (!userInfo.isLogin) {
      toast.error("Login or Sign up is required");
      return;
    }
    if (!dataRange.startDate || !dataRange.endDate || !totalPrice) {
      toast.error("Select Date First.");
      return;
    }

    console.log(dataRange);

    const reserveData = await fetch(
      "http://localhost:5000/reservation/reserve",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": userInfo.token,
        },
        body: JSON.stringify({
          listingId: listing.id,
          startDate: dataRange.startDate,
          endDate: dataRange.endDate,
          totalPrice: totalPrice,
        }),
      }
    );
    const parsedData = await reserveData.json();
    // console.log(parsedData);

    if (parsedData.success) {
      toast.success(parsedData.message);
      router.refresh()
      setDataRange({
        startDate:new Date(),
        endDate:new Date,
        key:"selection"
      })
      setTotalPrice(listing.price)
      getData()
    } else {
      toast.error(parsedData.message);
    }
  };
  console.log(disableDates);

  useEffect(() => {
    getData();
    setMount(true);
  }, []);
  return (
    <>
      {mount && (
        <div className="py-10  mx-auto   ">
          <div className="w-full  mx-auto">
            <img
              src={`http://localhost:5000/Images/${listing.imageUrl}`}
              alt=""
              className="object-cover  max-h-[70vh] block mx-auto"
            />
          </div>
          <div className="mt-5 flex md:flex-row mx-auto flex-col justify-around ">
            <div className="  pl-5">
              <div className="xl:px-28 lg:px-14 md:px-5 px-2 flex items-center mt-4">
                <h4 className="text-xl font-bold">Hosted By : {user} </h4>
                <img
                  src="Images/user.jpg"
                  alt=""
                  className=" ml-2 rounded-full h-8"
                />
              </div>
              <div className="xl:px-28 lg:px-14 md:px-5 px-2 flex gap-3 mt-2">
                <h4>{listing.GuestCount} Guests</h4>
                <h4>{listing.roomCount} Rooms</h4>
                <h4>{listing.bathroomCount} Bathrooms</h4>
              </div>
              <div className="xl:px-28 lg:px-14 md:px-5 px-2  gap-3 mt-3">
                <h5 className="text-lg font-bold">Description : </h5>
                <h6>{listing.description}</h6>
              </div>
            </div>
            <div className="md:mt-0 mt-8 pl-5 flex flex-col">
              <h4 className="text-xl font-bold">
                Price : $ {listing.price}/night
              </h4>
              <DateRange
                ranges={[dataRange]}
                // date={new Date()}
                onChange={handleChange}
                minDate={new Date()}
                rangeColors={["#262626"]}
                showDateDisplay={false}
                disabledDates={disableDates}
              />
              <button
                className="bg-rose-500 text-white hover:bg-rose-600 py-2 px-3"
                onClick={reserveNow}
              >
                Reserve
              </button>
              <h5 className="text-xl mt-2 font-bold">
                Total Price : $ {totalPrice}{" "}
              </h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hello;
