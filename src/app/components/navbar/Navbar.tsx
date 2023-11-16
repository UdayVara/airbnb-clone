import React, { useEffect, useState } from 'react'
import Menustrip from './Menustrip'
import Navmenu from './Navmenu'
import Link from 'next/link'
function Navbar():React.ReactNode {

  return (
    <>
        <nav className="mb-1 w-full flex flex-row justify-between items-center pt-3 pb-3  rounded border-b md:px-8 px-3">
            <Link href={"/"}> <img src="Images/logo.png" className="h-9 bg-white" alt="" /> </Link>
            <Menustrip  />
            <Navmenu />
        </nav>
    </>
  )
}

export default Navbar