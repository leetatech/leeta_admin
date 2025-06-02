import React from 'react';
import DashboardStats from './DashboardStats';
import filtericon from "../../../assets/Utility Icons (heroicons-mini) (2).svg"
import DashboardMap from './DashboardMap';
import PieChart from './PieChart';
import BarChartLayout from './BarChartLayer';
import Performance from './Performance';

const Dashboard = () => {
  return (
    <div className=" min-h-screen w-full">
      <div className="p-8 pb-1 flex justify-between items-center">
        <h1 className="text-3xl">Dashboard</h1>
        <div className='flex justify-center items-center gap-2'>
          <input className='border outline-none border-[#C0D5DE] pl-1 w-[144px] h-[36px]' type="date" />
          <select className='border outline-none border-[#C0D5DE] pl-1 w-[99px] h-[36px]'>
            <option>monthly</option>
          </select>
          <button className='flex items-center justify-center gap-1 border  border-[#C0D5DE]  w-[76px] h-[36px]'>
            <img src={filtericon} alt='filtericon' />
            filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="p-6 space-y-6">
          <DashboardStats
            />
        </div>
      </div>

      <div className='flex p-7 gap-8'>
        <DashboardMap />
        <PieChart/>
      </div>
      <div className='flex p-7 gap-8'>
        <BarChartLayout />
        <Performance />
      </div>
    </div>
  );
};

export default Dashboard;
