import React, { useState } from "react";
import Typography from "../components/Typography/Typography";
import { TypographyVariant } from "../components/types";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdBriefcase } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";

const statusOptions = ["Pending", "Cancelled", "Completed"];

const orders = Array.from({ length: 75 }, (_, i) => ({
  id: i + 1,
  date: "Dec 6, 2024",
  customer: "Santana Lukas",
  product: "Gas Cylinders",
  time: "12pm",
  status: statusOptions[i % 3],
}));

const ITEMS_PER_PAGE = 12;

export default function OrderDashboard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [filterActive, setFilterActive] = useState<boolean>(false);

  const filteredOrders = filterActive
    ? orders.filter((order) => selectedOrders.includes(order.id))
    : orders;

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleOrder = (id: number) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const allSelected = currentOrders.every((order) =>
    selectedOrders.includes(order.id)
  );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders((prev) =>
        prev.filter((id) => !currentOrders.some((o) => o.id === id))
      );
    } else {
      const newSelections = currentOrders
        .filter((order) => !selectedOrders.includes(order.id))
        .map((order) => order.id);
      setSelectedOrders((prev) => [...prev, ...newSelections]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Typography className="text-3xl font-bold" variant={TypographyVariant.TITLE}>
        Orders
      </Typography>

      <div className="grid grid-cols-3 gap-[102px]">
        <div className="rounded border-[#E0E2E6] shadow-md p-4 w-60 bg-white">
          <div className="flex gap-1 items-center pb-1">
            <FaShoppingCart />
            <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
              Today's Orders
            </Typography>
          </div>
          <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
            15,359
          </Typography>
        </div>
        <div className="rounded border-[#E0E2E6] shadow-md p-4 w-60 bg-white">
          <div className="flex gap-1 items-center pb-1">
            <IoMdBriefcase />
            <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
              Pending Orders
            </Typography>
          </div>
          <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
            13,421
          </Typography>
        </div>
        <div className="rounded border-[#E0E2E6] shadow-md p-4 w-60 bg-white">
          <div className="flex gap-1 items-center pb-1">
            <IoMdBriefcase />
            <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
              Cancelled Order
            </Typography>
          </div>
          <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
            1,192
          </Typography>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div
            className={`border-[#C0D5DE] w-56 bg-white flex items-center justify-center gap-2 border border-dashed px-4 py-2 rounded ${
              filterActive ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setFilterActive((prev) => !prev)}
          >
            <FaCirclePlus />
            Filter
            <span className="bg-[#E0E2E6] w-[0.7px] h-6"></span>
            <button className="flex items-center w-26 px-3 h-5 text-[12px] text-[#3A3E44] font-title rounded-full bg-[#D4D8DD]">
              {selectedOrders.length} selected x
            </button>
          </div>
        </div>
        <div>
          <select className="border-[#C0D5DE] border rounded p-2 px-4 text-[14px]">
            <option>All categories</option>
          </select>
        </div>
      </div>

      <table className="w-full bg-white border-[#E0E2E6] mt-4">
        <thead className="bg-white">
          <tr>
            <th className="p-3 font-title text-left">
              <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
            </th>
            <th className="p-3 font-title text-left">Date</th>
            <th className="p-3 font-title text-left">Customer</th>
            <th className="p-3 font-title text-left">Status</th>
            <th className="p-3 font-title text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id} className="border-0 border-b border-[#E0E2E6]">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleOrder(order.id)}
                />
              </td>
              <td className="p-3 text-[14px]">{order.date}</td>
              <td className="p-3">
                <span className="font-medium text-[14px] font-title">{order.customer}</span>{" "}
                placed a new order for{" "}
                <strong className="text-[14px]">"{order.product}"</strong>
              </td>
              <td className="p-3 font-title text-[12px]">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-500"
                      : order.status === "Cancelled"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3 font-title text-[12px] text-blue-500 cursor-pointer">
                View Order Details
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-1 pb-28 items-center mt-4">
        <button
          className="border bg-white h-8 px-2 py-2 rounded flex items-center gap-1 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
          Back
        </button>

        <div className="flex gap-2 flex-wrap justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 h-8 rounded border ${
                currentPage === i + 1 ? "bg-black text-white" : "bg-white"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="border bg-white h-8 px-2 py-2 rounded flex items-center gap-1 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <div>
        <select className="ml-4 border rounded p-2" value={ITEMS_PER_PAGE}>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
}