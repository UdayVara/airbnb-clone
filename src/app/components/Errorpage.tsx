import React from 'react'

function Errorpage({title,subtitle}:{title:string,subtitle:string}) {
  return (
    <div className='w-full h-full grid place-items-center '>
        <h4 className='text-xl font-semibold'>{title}</h4>
        <h4 className='text-md font-semibold text-neutral-700'>{subtitle}</h4>
    </div>
  )
}

export default Errorpage