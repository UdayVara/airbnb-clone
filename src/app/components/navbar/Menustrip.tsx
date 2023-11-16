
import React from "react";
import {AiOutlineSearch} from "react-icons/ai"
function Menustrip(): React.ReactNode {
  return <>
    <div className="flex flex-row items-center mt-1 shadow-sm self-center">
        <div className="text-center py-2  border px-3 md:block hidden cursor-pointer hover:bg-slate-50">Anywhere</div>
        <div className="text-center py-2  border px-3 md:block hidden cursor-pointer hover:bg-slate-50">Any Week</div>
        <div className="text-center py-2   px-3 flex items-center flex-row md:border cursor-pointer border-0 hover:bg-slate-50">
            <p className="md:block hidden">Add Guests </p>
            <p className="bg-rose-500 ml-1 p-1 text-white md:block hidden rounded-full">
                <AiOutlineSearch   />
            </p>
        </div>
    </div>
  </>;
}

export default Menustrip;
