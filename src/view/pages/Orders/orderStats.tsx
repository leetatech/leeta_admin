import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdBriefcase } from "react-icons/io";
import Typography from "../../components/Typography/Typography";
import { TypographyVariant } from "../../components/types";

interface OrderStatsProps {
  todaysOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  completedOrders: number;
}

const OrderStats: React.FC<OrderStatsProps> = ({ todaysOrders, pendingOrders, cancelledOrders, completedOrders }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <FaShoppingCart className="text-gray-500" />
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Today's Orders
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {todaysOrders.toLocaleString()}
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <IoMdBriefcase className="text-gray-500" />
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Pending Orders
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {pendingOrders.toLocaleString()}
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <IoMdBriefcase className="text-gray-500" />
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Cancelled Orders
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {cancelledOrders.toLocaleString()}
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <IoMdBriefcase className="text-gray-500" />
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Completed Orders
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {completedOrders.toLocaleString()}
        </Typography>
      </div>
    </div>
  );
};

export default OrderStats;
