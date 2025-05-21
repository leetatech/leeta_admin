import React from "react";
import { Table } from "@mantine/core";
import { useSelector } from "react-redux";
import type { RootState } from "../../../state";
import { Vendor } from "../../../features/vendors/vendor_types";

const VendorsTable = () => {
  const { vendorData } = useSelector((state: RootState) => state.vendors);
  const [allVendors, setAllVendors] = React.useState<Vendor[]>([])

  React.useEffect(() => {
    setAllVendors((vendorData?.data?.data || []) as Vendor[]);
  }, [vendorData])

  return (
    <div className="w-full rounded-md overflow-hidden relative">
      <Table striped highlightOnHover withTableBorder className="min-w-full w-full table-auto bg-white">
        <Table.Thead className="bg-blue-50">
          <Table.Tr>
            <Table.Th className="p-3 text-left font-title">User</Table.Th>
            <Table.Th className="p-3 text-left font-title">Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {allVendors.map((vendor) => (
            <Table.Tr key={vendor.id} className="border-b border-[#E0E2E6]">
              <Table.Td className="p-3 text-[14px]">{vendor.first_name} {vendor.last_name}</Table.Td>
              <Table.Td className="p-3 text-[14px]">{vendor.email?.address}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VendorsTable;
