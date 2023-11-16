"use client";
import React, { useState, useEffect, useReducer } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../redux/features/modalFeature";
import { login, logout } from "@/app/redux/features/loginFeature";
import { openRentModal } from "@/app/redux/features/rentModalFeature";
import Link from "next/link";
import { useRouter } from "next/navigation";


function Navmenu(): React.ReactNode {
  const [showNav, updateNav] = useState<Boolean>(false);
  const router = useRouter()
  const loginState = useSelector((state) => state.login);
  console.log(loginState);

  const toggleNav = (): void => {
    if (showNav) {
      updateNav(false);
    } else {
      updateNav(true);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("airbnb-token")) {
      dispatch(login(localStorage.getItem("airbnb-token") as string));
    }
  }, []);
  return (
    <>
      <div className="flex flex-row gap-2 mt-1 items-center mr-2 ">
        <p className="text-md font-bold sm:block hidden  cursor-pointer hover:shadow hover:rounded-2xl p-2 hover:bg-slate-100" onClick={()=>{dispatch(openRentModal())}}>Airbnb Your Home</p>
        <div className="flex rounded-3xl items-center shadow px-3 py-2">
          <p className="bg-rose-500 ml-1 p-1 text-white md:hidden block rounded-full">
            <AiOutlineSearch />
          </p>
          {!showNav ? (
            <GiHamburgerMenu
              className="text-xl mr-2 cursor-pointer ml-1"
              onClick={toggleNav}
            />
          ) : (
            <AiOutlineClose
              className="text-xl mr-2 cursor-pointer ml-1"
              onClick={toggleNav}
            />
          )}
          <img
            src="Images/user.jpg"
            className="h-6 rounded-full sm:block hidden pointer-events-none select-none"
            alt=""
          />
        </div>
      </div>
      {showNav && (
        <div className={`w-52 transition-all fixed top-14 bg-white border rounded shadow-lg  right-1 flex flex-col z-40`}>
          {!loginState.isLogin && (
            <>
              {" "}
              <h2
                className="text-lg border-b pl-3 py-2 cursor-pointer hover:bg-slate-100 select-none"
                onClick={() => {
                  dispatch(open());
                }}
              >
                Sign up
              </h2>
              <h2
                className="text-lg border-b pl-3 py-2 cursor-pointer hover:bg-slate-100 select-none"
                onClick={() => {
                  dispatch(open());
                }}
              >
                Login
              </h2>{" "}
            </>
          )}
          {loginState.isLogin && (
            <>
              <Link href="/trips"><h2 className="text-lg border-b pl-3 py-2 cursor-pointer hover:bg-slate-100 select-none">
                My Trips
              </h2></Link>
              <Link href="/properties"><h2 className="text-lg border-b pl-3 py-2 cursor-pointer hover:bg-slate-100 select-none">
                My Properties
              </h2></Link>
              <h2
                className="text-lg border-b pl-3 py-2 cursor-pointer hover:bg-slate-100 select-none"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("airbnb-token");
                  router.push("/")
                }}
              >
                Logout
              </h2>
            </>
          )}
          
        </div>
      )}
    </>
  );
}

export default Navmenu;
