import React from 'react'
import Typography from '../../components/Typography/Typography'
import { TypographyVariant } from '../../components/types'

const performance = () => {
  return (
    <div className="rounded border-[#E0E2E6] flex justify-center items-center  shadow-md p-4 w-[506px]  bg-white">
        <div className='flex items-center gap-10'>
            <div>
                <Typography variant={TypographyVariant.SUBTITLE}>Store Performance</Typography>
                  <Typography variant={TypographyVariant.SMALL}>Quickly access your performance </Typography>
            </div>
            <button className='bg-[#1C57B6] text-white h-[45px] w-[160px] text-xs rounded p-2'>Quick look</button>
        </div>

    </div>
  )
}

export default performance