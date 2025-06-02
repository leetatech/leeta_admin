import React from 'react'
import Chart from './Charts'
import { TypographyVariant } from '../../components/types'
import Typography from '../../components/Typography/Typography'

const PieChart = () => {
  return (
    <div  className="rounded border-[#E0E2E6] shadow-md pb-28 p-4 w-[345px] bg-white">
      <div className='flex justify-between p-3'>
         <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
           sold gas
          </Typography>
       
         <button className='flex items-center text-xs justify-center gap-1 border  border-[#C0D5DE]  w-[46px] h-[30px]'>
          see all
          </button>
      </div>
      <div>
        <Chart/>

      </div>
    </div>
  )
}

export default PieChart