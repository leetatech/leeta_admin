import React from "react";
import Typography from "../../components/Typography/Typography";
import { TypographyVariant } from "../../components/types";

interface VendorStatsProps {
  totalUsers: number;
  pendingOnboardingCompletion: number;
  completedOnboarding: number;
  invalidOnboarding: number;
}

const VendorStats: React.FC<VendorStatsProps> = ({ totalUsers, pendingOnboardingCompletion, completedOnboarding, invalidOnboarding }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Total Vendors
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {totalUsers.toLocaleString()}
        </Typography>
        <Typography className="text-gray-400 text-sm mt-2" variant={TypographyVariant.EXTRA_SMALL}>
          All registered vendors in the system
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Pending Onboarding
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {pendingOnboardingCompletion.toLocaleString()}
        </Typography>
        <Typography className="text-gray-400 text-sm mt-2" variant={TypographyVariant.EXTRA_SMALL}>
          Vendors yet to complete onboarding
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Onboarding Completed
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {completedOnboarding.toLocaleString()}
        </Typography>
        <Typography className="text-gray-400 text-sm mt-2" variant={TypographyVariant.EXTRA_SMALL}>
          Vendors who completed all steps
        </Typography>
      </div>
      <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
        <div className="flex gap-1 items-center pb-1">
          <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
            Invalid Onboarding Documents
          </Typography>
        </div>
        <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
          {invalidOnboarding.toLocaleString()}
        </Typography>
        <Typography className="text-gray-400 text-sm mt-2" variant={TypographyVariant.EXTRA_SMALL}>
          Submissions with invalid documents
        </Typography>
      </div>
    </div>
  );
};

export default VendorStats;
