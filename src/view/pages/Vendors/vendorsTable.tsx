import React from "react";
import { Table } from "@mantine/core";

const VendorsTable = () => {
  return (
    <div className="w-full rounded-md border overflow-hidden relative">
      <Table striped highlightOnHover withTableBorder className="min-w-full w-full table-auto bg-white">
        <Table.Thead className="bg-blue-50">
          <Table.Tr>
            <Table.Th className="p-3 text-left font-title">User</Table.Th>
            <Table.Th className="p-3 text-left font-title">Email</Table.Th>
            <Table.Th className="p-3 text-left font-title">Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
      </Table>
    </div>
  )
}

export default VendorsTable;