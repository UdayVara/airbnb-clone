"use client"

import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { closeRentModal } from '@/app/redux/features/rentModalFeature'
import ChooseCategory from './rentmodal/ChooseCategory'
import ChooseLocation from './rentmodal/ChooseLocation'
import RentInfo from './rentmodal/RentInfo'
import UploadPhoto from './rentmodal/UploadPhoto'
import Description from './rentmodal/Description'
import Price from './rentmodal/Price'


enum steps  {
    CATEGORY=0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE = 5

}
const RentModal = () => {
    const [step,updateStep] = useState<steps>(steps.CATEGORY)
    const dispatch = useDispatch()
    const [body,updateBody] = useState<React.ReactNode>(<></>)
    const isOpen = useSelector((state) => state.rentModal.value)

    
    
    const goBack = () => {
        updateStep(step-1)
    }
    const goForward = () => {
        updateStep(step+1)
    }

    const reset = () => {
        updateStep(steps.CATEGORY)
    }
    const handleClose = () => {
        dispatch(closeRentModal())
    }

    
    useEffect(()=>{
        if (step == steps.CATEGORY) {
            updateBody(<ChooseCategory next={goForward}  />)
        }
        else if(step === steps.LOCATION){
            updateBody(<ChooseLocation previous={goBack} next={goForward} />)
        }
        else if(step === steps.INFO){
            updateBody(<RentInfo previous={goBack} next={goForward}  />)
        }
        else if(step === steps.IMAGES){
            updateBody(<UploadPhoto previous={goBack} next={goForward}/>)
        }
        else if(step === steps.DESCRIPTION){
            updateBody(<Description previous={goBack} next={goForward} />)
        }
        else if(step==steps.PRICE){
            updateBody(<Price reset={reset} previous={goBack}/>)
        }
    },[step])
  return (
    <div>
         {<Modal stateOpen={isOpen} title={"Airbnb Your Home"} footer={body} onClose={handleClose}  />}
    </div>
  )
}

export default RentModal
