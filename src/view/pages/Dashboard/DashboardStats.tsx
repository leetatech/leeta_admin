import React from 'react'
import { TypographyVariant } from '../../components/types'
import Typography from '../../components/Typography/Typography'
import carticon from "../../../assets/Utility Icons (heroicons-mini).svg"
import totalicon from "../../../assets/Utility Icons (heroicons-mini) (1).svg"
import newicon from "../../../assets/Utility Icons (heroicons-mini) (2).svg"
import ordersicon from "../../../assets/Utility Icons (heroicons-mini) (3).svg"

const DashbaordStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500 flex items-center gap-2" variant={TypographyVariant.SMALL}>
            <img src={carticon} alt='cart icon'/>
            Gas sold
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
         
           <p>32,000</p>
        </Typography>
       
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500 flex items-center gap-2" variant={TypographyVariant.SMALL}>
            <img src={totalicon} alt='total icon' />
            Total oders
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
         
           <p>153,467</p>
        </Typography>
       
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500  flex items-center gap-2" variant={TypographyVariant.SMALL}>
            <img src={newicon} alt='' />
            New vendors
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
         
          <p>4,300</p>
        </Typography>
       
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500  flex items-center gap-2" variant={TypographyVariant.SMALL}>
            <img src={ordersicon} alt='' />
            New orders
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
         
           <p>12,000</p>
        </Typography>
       
      </div>
    </div>
  )
}

export default DashbaordStats