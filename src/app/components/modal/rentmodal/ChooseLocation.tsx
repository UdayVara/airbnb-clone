"use client";
import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import { getAllCountries, getByValue } from "../countries";
import Map from "./Map";
import dynamic from "next/dist/shared/lib/dynamic";
import { useDispatch } from "react-redux";
import { location } from "@/app/redux/features/listingFeature";
function ChooseLocation({
  next,
  previous,
}: {
  next: () => void;
  previous: () => void;
}) {
  const countries = getAllCountries();
  console.log(countries);
  
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        ssr: false,
      }),
    [selectedCountry]
  );
  const handleChange = (value) => {
    if (!value) {
      return;
    }
    console.log(value);

    const country = getByValue(value.value);
    console.log(country);

    setSelectedCountry(country);
  };
  console.log(selectedCountry);

  const dispatch = useDispatch()
  const handleNext = () => {
    dispatch(location(selectedCountry.label))
    next()
  }
  return (
    <>
      <div className="px-3">
        <h4 className="font-bold text-xl">Where is Your Place Located</h4>
        <h6 className="ml-1 text-neutral-700 text-sm">
          Help Guests Locate You
        </h6>

        <Select
          isClearable={true}
          isSearchable={true}
          name="Choose Country"
          placeholder="Choose Country"
          options={getAllCountries()}
          className="z-10 mt-4 mb-3 text-lg"
          onChange={handleChange}
          formatOptionLabel={(options) => {
            return (
              <div>
                {options.flag} {options.label}, {options.region}
              </div>
            );
          }}
        />

        <Map center={selectedCountry.latlng} />

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

export default ChooseLocation;
