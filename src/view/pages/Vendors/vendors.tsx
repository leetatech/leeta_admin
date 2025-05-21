import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import type {RootState} from "../../../state"
import VendorStats from "./vendorStats";
import VendorsTable from "./vendorsTable";
import { triggerVendorList } from "../../../features/vendors/vendor_slice"
import {DEFAULT_ORDER_PER_PAGE} from "../Orders/types";
import type {AppDispatch} from "../../../state";
import {BusinessRegistrationStatus, Vendor} from "../../../features/vendors/vendor_types";

function Vendors() {
  const dispatch = useDispatch<AppDispatch>();
  const vendorsState = useSelector((state: RootState)=> state.vendors)
  const { vendorData } = useSelector((state: RootState) => state.vendors);
  const vendors = (vendorData?.data?.data || []) as Vendor[];


  const totalVendors = vendorsState?.vendorData?.data?.metadata?.paging?.total|| 0;
  const pendingOnboardingCompletion = vendors.filter(vendor => vendor.status === BusinessRegistrationStatus.PendingConfirmation).length;
  const onboardingComplete = vendors.filter(vendor => vendor.status === BusinessRegistrationStatus.RegistrationApproved).length;
  const rejectedOnboarding = vendors.filter(vendor => vendor.status === BusinessRegistrationStatus.RegistrationRejected).length;
  console.log(vendorsState)

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_ORDER_PER_PAGE);

  useEffect(() => {
    const payload = {
      paging: {
        index: currentPage,
        size: pageSize,
      },
    };
    dispatch(triggerVendorList(payload));

    return
  }, [dispatch, pageSize, currentPage]);

  return (
    <div className="relative w-full">
      <div className="p-8 pb-1">
        <h1 className="text-3xl">User Management</h1>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="p-6 space-y-6">
          <VendorStats
            totalUsers={totalVendors}
            pendingOnboardingCompletion={pendingOnboardingCompletion}
            completedOnboarding={onboardingComplete}
            invalidOnboarding={rejectedOnboarding}
          />
          <VendorsTable />
        </div>
      </div>
    </div>
  )
}

export default Vendors;