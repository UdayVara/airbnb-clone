"use client;";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
function Modal({
  footer,
  stateOpen,
  title,
  onClose
}: {
  footer: React.ReactNode;
  stateOpen: boolean;
  title:string;
  onClose:()=> void
}): React.ReactNode {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <div
        className={`w-full h-full backdrop-blur-sm backdrop-opacity-80 backdrop-brightness-90  z-50 fixed top-0 bg-opacity-40 flex justify-center items-center ${
          stateOpen ? "translate-y-0 scale-100" : "translate-y-full scale-0"
        } transition-all duration-[600ms] origin-bottom`}
      >
        <div className="bg-white rounded-md px-2  w-full max-w-md  lg:max-w-lg  pt-2 pb-5">
        {/* <div className="header shadow flex flex-row justify-between items-center"> */}
        <AiOutlineClose
          className=" cursor-pointer text-2xl ml-2 mb-3 float-left"
          onClick={onClose}
          id="closeBtn"
        />
        <h2 className="font-bold text-xl text-center border-b pb-1 mb-3">{title}</h2>
        <h2></h2>
      {/* </div> */}
          {footer}
        </div>
      </div>
    </>
  );
}

export default Modal;
