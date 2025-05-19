import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdDoubleArrow } from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import { FaShoppingCart } from "react-icons/fa"
import { IoMdBriefcase } from "react-icons/io"
import type { AppDispatch, RootState } from "../../state"
import Typography from "../components/Typography/Typography"
import { TypographyVariant } from "../components/types"
import {
  resetStatusUpdate,
  setAction,
  setDetailsGenState,
  triggerOrderList,
  triggerOrderUpdate,
} from "../../features/orders/order_slice"
import Loader from "../components/Loader"
import { formatDate } from "../../utilities/helpers"
import { toast } from "react-toastify"
import Pill from "../components/Pill"

const statusOptions = ["Pending", "Cancelled", "Completed"]

// Mock data for demonstration
const demoData = Array.from({ length: 75 }, (_, i) => ({
  id: i + 1,
  date: new Date().getTime(), // Using timestamp for formatDate
  customer: "Santana Lukas",
  product: "Gas Cylinders",
  time: "12pm",
  status: statusOptions[i % 3],
  location: "123 Main Street, City",
}))

const ITEMS_PER_PAGE = 12

function Demo() {
  const dispatch = useDispatch<AppDispatch>()

  // Redux state selectors - using a more generic approach
  const orderState = useSelector((state: RootState) => state.order)
  const loading = orderState?.loading || false

  // We'll use a local state to track updates instead of relying on Redux state properties
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState(false)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const [filterActive, setFilterActive] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(ITEMS_PER_PAGE)

  // Fetch orders on component mount
  useEffect(() => {
    const payload = {
      paging: {
        index: 0,
        size: pageSize,
      },
    }
    dispatch(triggerOrderList(payload))

    return () => {
      // Clean up on unmount
      dispatch(resetStatusUpdate())
    }
  }, [dispatch, pageSize])

  // Handle order update status changes
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Order updated successfully")
      setUpdateSuccess(false)
      dispatch(resetStatusUpdate())
      dispatch(triggerOrderList({ page: 1, limit: pageSize }))
    } else if (updateError) {
      toast.error("Failed to update order")
      setUpdateError(false)
      dispatch(resetStatusUpdate())
    }
  }, [updateSuccess, updateError, dispatch, pageSize])

  // Memoize filtered orders to prevent unnecessary recalculations
  const filteredOrders = useMemo(() => {
    return filterActive ? demoData.filter((order) => selectedOrders.includes(order.id)) : demoData
  }, [filterActive, selectedOrders])

  const totalPages = Math.ceil(filteredOrders.length / pageSize)

  const currentOrders = useMemo(() => {
    return filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  }, [filteredOrders, currentPage, pageSize])

  const toggleOrder = (id: number) => {
    setSelectedOrders((prev) => (prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]))
  }

  const allSelected = currentOrders.every((order) => selectedOrders.includes(order.id))

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders((prev) => prev.filter((id) => !currentOrders.some((o) => o.id === id)))
    } else {
      const newSelections = currentOrders.filter((order) => !selectedOrders.includes(order.id)).map((order) => order.id)
      setSelectedOrders((prev) => [...prev, ...newSelections])
    }
  }

  const handleViewDetails = (orderId: number) => {
    dispatch(setDetailsGenState(true))
    dispatch(setAction("view"))
    // Navigate to details or open modal
  }

  const handleAcceptOrder = (orderId: number) => {
    dispatch(setAction("accept"))
    dispatch(triggerOrderUpdate({ id: orderId, status: "Completed" }))
    setUpdateSuccess(true) // Simulate success response
  }

  const handleDeclineOrder = (orderId: number) => {
    dispatch(setAction("decline"))
    dispatch(triggerOrderUpdate({ id: orderId, status: "Cancelled" }))
    setUpdateSuccess(true) // Simulate success response
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="p-6 space-y-6">
      <Typography className="text-3xl font-bold" variant={TypographyVariant.TITLE}>
        Orders
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
          <div className="flex gap-1 items-center pb-1">
            <FaShoppingCart className="text-gray-500" />
            <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
              Today's Orders
            </Typography>
          </div>
          <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
            15,359
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
            13,421
          </Typography>
        </div>

        <div className="rounded border-[#E0E2E6] shadow-md p-4 bg-white">
          <div className="flex gap-1 items-center pb-1">
            <IoMdBriefcase className="text-gray-500" />
            <Typography className="text-gray-500" variant={TypographyVariant.SMALL}>
              Cancelled Order
            </Typography>
          </div>
          <Typography className="text-2xl font-semibold" variant={TypographyVariant.SUBTITLE}>
            1,192
          </Typography>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div
          className={`border-[#C0D5DE] bg-white flex items-center justify-center gap-2 border border-dashed px-4 py-2 rounded cursor-pointer ${
            filterActive ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setFilterActive((prev) => !prev)}
        >
          <MdDoubleArrow />
          <Typography variant={TypographyVariant.SMALL}>Filter</Typography>
          <span className="bg-[#E0E2E6] w-[0.7px] h-6"></span>
          <div className="flex items-center w-26 px-3 h-5 text-[12px] text-[#3A3E44] font-title rounded-full bg-[#D4D8DD]">
            {selectedOrders.length} selected x
          </div>
        </div>

        <div>
          <select className="border-[#C0D5DE] border rounded p-2 px-4 text-[14px]">
            <option>All categories</option>
          </select>
        </div>
      </div>

      <div className="rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead className="bg-white">
              <tr>
                <th className="p-3 font-title text-left">
                  <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                </th>
                <th className="p-3 font-title text-left">Date</th>
                <th className="p-3 font-title text-left">Customer</th>
                <th className="p-3 font-title text-left">Status</th>
                <th className="p-3 font-title text-left">Location</th>
                <th className="p-3 font-title text-left">Actions</th>
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
                  <td className="p-3 text-[14px]">{formatDate(order.date)}</td>
                  <td className="p-3">
                    <Typography variant={TypographyVariant.SMALL} className="font-medium">
                      {order.customer}
                    </Typography>{" "}
                    placed a new order for{" "}
                    <Typography variant={TypographyVariant.SMALL} className="font-bold">
                      "{order.product}"
                    </Typography>
                  </td>
                  <td className="p-3">
                    <Pill text={order.status} />
                  </td>
                  <td className="p-3 text-[14px]">
                    <div className="flex items-center gap-1">
                      <IoLocationOutline />
                      {order.location}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleAcceptOrder(order.id)}
                      >
                        Accept
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDeclineOrder(order.id)}>
                        Decline
                      </button>
                    </div>
                  </td>
                  <td
                    className="p-3 font-title text-[12px] text-blue-500 cursor-pointer"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    View Order Details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Items per page:</span>
          <select
            className="border rounded p-1"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={12}>12</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="border bg-white h-8 px-2 py-2 rounded flex items-center gap-1 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdDoubleArrow className="rotate-180" />
            Back
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber =
                currentPage > 3 && totalPages > 5
                  ? currentPage - 3 + i + (totalPages - currentPage < 2 ? totalPages - currentPage - 2 : 0)
                  : i + 1

              if (pageNumber <= totalPages) {
                return (
                  <button
                    key={pageNumber}
                    className={`px-3 h-8 rounded border ${
                      currentPage === pageNumber ? "bg-black text-white" : "bg-white"
                    }`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              }
              return null
            })}
          </div>

          <button
            className="border bg-white h-8 px-2 py-2 rounded flex items-center gap-1 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <MdDoubleArrow />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Demo
