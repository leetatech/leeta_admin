import React from "react"
import VendorStats from "./vendorStats";
import VendorsTable from "./vendorsTable";

function Vendors() {
  return (
    <div className="relative w-full">
      <div className="p-8 pb-1">
        <h1 className="text-3xl">User Management</h1>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="p-6 space-y-6">
          <VendorStats
            totalUsers={100}
            onboardedUsers={200}
            totalSales={500}
            totalUpgrades={501}
          />
          <VendorsTable />
        </div>
      </div>
    </div>
  )
}

export default Vendors;