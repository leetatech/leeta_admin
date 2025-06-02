import React from 'react'
import mapimage from "../../../assets/choropleth map.svg"
import { TypographyVariant } from '../../components/types'
import Typography from '../../components/Typography/Typography'
import filtericon from "../../../assets/Utility Icons (heroicons-mini) (2).svg"
import viewmoreicon from "../../../assets/Utility Icons (heroicons-mini) (3).svg"

const DasboardMap = () => {
  return (
    <div className="rounded border-[#E0E2E6]  shadow-md p-4 w-[856px]  bg-white">
      <div className=' flex items-center justify-between pb-2 gap-2'>
         <Typography className="text-gray-500" variant={TypographyVariant.SUBTITLE}>
           Sales by Divisons
          </Typography>
          <div className='flex gap-2'>
             <button className='flex items-center justify-center gap-1 border  border-[#717171]  w-[68px] h-[36px]'>
            <img src={filtericon} alt='filtericon' />
            filter
          </button>
           <button className='flex items-center justify-center gap-1 border  border-[#C0D5DE]  w-[30px] h-[36px]'>
            <img src={viewmoreicon} alt='viewmore' />
          </button>
          </div>
      </div>
    <div className='bg-[#F0F6FF] flex justify-center h-[300px] items-center gap-10'>
  <img className='w-[304px]' src={mapimage} alt="mapimage" />
  <div>
    <div className="flex items-center pt-8 pb-8 gap-2 bg-white p-6 w-[180px] rounded-lg shadow-md">
      <div className="h-24 w-8 bg-gradient-to-b from-blue-900 to-white rounded"></div>
      <div className="flex flex-col items-start gap-0 justify-center text-gray-700 text-[12px] space-y-1">
        <span className="whitespace-nowrap">High (&gt;₦5K)</span>
        <span className="whitespace-nowrap">Medium (₦5k–₦2k)</span>
        <span className="whitespace-nowrap">Low (&lt;₦2K)</span>
      </div>
    </div>
  </div>
</div>

        
    </div>
  )
}

export default DasboardMap