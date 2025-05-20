import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdBriefcase } from "react-icons/io";
import Typography from "../../components/Typography/Typography";
import { TypographyVariant } from "../../components/types";

interface VendorStatsProps {
  totalUsers: number;
  onboardedUsers: number;
  totalSales: number;
  totalUpgrades: number;
}

const VendorStats: React.FC<VendorStatsProps> = ({ totalUsers, onboardedUsers, totalSales, totalUpgrades }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Total Users
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {totalUsers.toLocaleString()}
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Onboarding Complete
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {onboardedUsers.toLocaleString()}
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Total Sales
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {totalSales.toLocaleString()}
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Total Upgrades
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {totalUpgrades.toLocaleString()}
        </Typography>
      </div>
    </div>
  );
};

export default VendorStats;
