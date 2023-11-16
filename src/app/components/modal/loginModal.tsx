"use client";
import { close } from "@/app/redux/features/modalFeature";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { toast } from "react-toastify";
import { login } from "@/app/redux/features/loginFeature";
import Modal from "./Modal";

function LoginModal(): React.ReactNode {
  const [data, setData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });
  const handleClose = () => {
    dispatch(close());
  };
  const stateOpen = useSelector((state) => state.modal.value);
  // console.log(stateOpen);
  const dispatch = useDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      toast.error("Enter A Valid Email");
      return;
    }
    if (data.username == "" || data.username.length < 5) {
      toast.error("Username must be of atleast 5 characters");
      return;
    }
    if (data.password == "" || data.password.length < 8) {
      toast.error("Length of password must be between 8 to 16");
      return;
    }

    const fetchData = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const parseFetchedData = await fetchData.json();
    console.log(parseFetchedData);
    if (parseFetchedData.success) {
      toast.success("Signed in Successfully.");
      localStorage.setItem("airbnb-token", parseFetchedData.token);
      dispatch(login(parseFetchedData.token));
      dispatch(close());
      setData({ username: "", email: "", password: "" });
    } else {
      toast.error(parseFetchedData.message as string);
    }
  };

  let body = (
    <>
      
      <div className="body mt-3 px-3 pt-2 pb-4">
        <h3 className="text-2xl font-bold">Welcome To Airbnb</h3>
        <h5 className="text-zinc-500 text-sm">
          Create or Login to Your Account
        </h5>
        <div className="form">
          <div className="relative my-5">
            <input
              type="email"
              name="email"
              id="email"
              className=" w-full text-lg py-2 pt-5
                  pl-2 focus:pl-3 transition-all duration-100 shadow border border-zinc-500 rounded focus:outline-none focus:border-rose-600 focus:border-2 focus:shadow-sm
                   focus:shadow-rose-700 px-2    peer"
              onChange={handleChange}
              placeholder=""
              value={data.email}
            />
            <label
              htmlFor="email"
              className=" pt-1 absolute left-2   text-md transition-all duration-100 
                  peer-placeholder-shown:translate-y-2
                  peer-focus:scale-90
                  peer-focus:-translate-y-1
                   "
            >
              Email
            </label>
          </div>
          <div className="relative my-5">
            <input
              type="text"
              name="username"
              id="username"
              className=" w-full text-lg py-2 pt-5
                  pl-2 focus:pl-3 transition-all duration-100 shadow border border-zinc-500 rounded focus:outline-none focus:border-rose-600 focus:border-2 focus:shadow-sm
                   focus:shadow-rose-700 px-2    peer"
              onChange={handleChange}
              placeholder=""
              value={data.username}
            />
            <label
              htmlFor="username"
              className=" pt-1 absolute left-2   text-md transition-all duration-100 
                  peer-placeholder-shown:translate-y-2
                  peer-focus:scale-90
                  peer-focus:-translate-y-1"
            >
              Name
            </label>
          </div>
          <div className="relative mt-4">
            <input
              type="password"
              name="password"
              id="pass"
              className=" w-full text-lg py-2 pt-5
                  pl-2 focus:pl-3 transition-all duration-100 shadow border border-zinc-500 rounded focus:outline-none focus:border-rose-600 focus:border-2 focus:shadow-sm
                   focus:shadow-rose-700 px-2    peer"
              placeholder=""
              onChange={handleChange}
              value={data.password}
            />
            <label
              htmlFor="pass"
              className=" pt-1 absolute left-2   text-md transition-all duration-100 
                  peer-placeholder-shown:translate-y-2
                  peer-focus:scale-90
                  peer-focus:-translate-y-1"
            >
              Password
            </label>
          </div>
        </div>
        <button
          className="w-full py-2 text-lg text-white rounded-3xl bg-rose-500 hover:bg-rose-600 my-2 mt-4 "
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </>
  );
  return (
    <>

    <Modal footer={body} stateOpen={stateOpen} title="Login or Signup" onClose={handleClose} />
      {/* <div className="px-3">
          <div className="flex flex-row  justify-between mt-4 border-black border p-3 items-center cursor-pointer hover:bg-slate-100">
            <FcGoogle className="text-xl ml-2" />
            <div>Continue With Google</div>
            <div></div>
          </div>
          <div className="flex flex-row  justify-between mt-4 border-black border p-3 items-center cursor-pointer hover:bg-slate-100">
            <AiFillGithub className="text-xl ml-2" />
            <div>Continue With Github</div>
            <div></div>
          </div>
        </div> */}
    </>
  );
}

export default LoginModal;
