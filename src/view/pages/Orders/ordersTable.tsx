import React, {useState, useEffect} from "react";
import { Table } from "@mantine/core";
import { useSelector } from "react-redux";
import type { RootState } from "../../../state";
import { TypographyVariant } from "../../components/types";
import Typography from "../../components/Typography/Typography";
import { formatDate } from "../../../utilities/helpers";
import {Order} from "./types"

interface OrdersTableProps {
  expandedRow: number | null;
  setExpandedRow: (id: number | null) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
                                                   expandedRow,
                                                   setExpandedRow,
                                                 }) => {
  const { orderData } = useSelector((state: RootState) => state.order);
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  // Update allOrders every time redux orderData changes
  useEffect(() => {
    setAllOrders((orderData?.data?.data || []) as Order[]);
  }, [orderData]);

  const handleDetailsClick = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="w-full rounded-md overflow-hidden relative">
      <Table striped highlightOnHover withTableBorder className="min-w-full w-full table-auto bg-white">
        <Table.Thead className="bg-blue-50">
          <Table.Tr>
            <Table.Th className="p-3 text-left font-title">Date</Table.Th>
            <Table.Th className="p-3 text-left font-title">Customer</Table.Th>
            <Table.Th className="p-3 text-left font-title">Status</Table.Th>
            <Table.Th className="p-3 text-left font-title">Location</Table.Th>
            <Table.Th className="p-3 text-left font-title">Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {allOrders.map((order: Order) => (
            <Table.Tr key={order.id} className="border-b border-[#E0E2E6]">
              <Table.Td className="p-3 text-[14px]">{formatDate(order.ts)}</Table.Td>
              <Table.Td className="p-3">
                <div className="flex flex-wrap items-center gap-1 text-sm">
                  <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM} className="font-medium inline">
                    {order.delivery_details.name}
                  </Typography>
                  <span>placed a new order for</span>
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM} className="font-bold inline">
                    "{order.orders?.[0]?.product_category}"
                  </Typography>
                </div>
              </Table.Td>
              <Table.Td className="p-3">
                <div
                  className={`
                        px-3 py-1 rounded-full text-xs font-medium w-fit
                        ${
                    order.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'ACCEPTED'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'PROCESSED'
                          ? 'bg-purple-100 text-purple-800'
                          : order.status === 'SHIPPED'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'CANCELLED' || order.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                                : order.status === 'COMPLETED'
                                  ? 'bg-teal-100 text-teal-800'
                                  : 'bg-gray-100 text-gray-800'
                  }
                        `}
                >
                  {order.status}
                </div>
              </Table.Td>
              <Table.Td className="p-3 text-[14px]">
                <div className="flex items-center gap-1">
                          <span>
                            {order.delivery_details.address?.lga},{" "}
                            {order.delivery_details.address?.full_address}
                          </span>
                </div>
              </Table.Td>
              <Table.Td className="p-3">
                <button
                  className="text-black hover:text-blue-700 font-medium border border-gray p-1 pr-4 pl-4"
                  onClick={() => handleDetailsClick(Number(order.order_number))}
                >
                  View
                </button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default OrdersTable;