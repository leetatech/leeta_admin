import React, { useState, useEffect } from "react"
import { Table,  } from '@mantine/core'
import { useDispatch, useSelector } from "react-redux"
import { MdDoubleArrow, MdOutlineClose} from "react-icons/md"
import { IoLocationOutline } from "react-icons/io5"
import { FaShoppingCart } from "react-icons/fa"
import { IoMdBriefcase } from "react-icons/io"
import type { AppDispatch, RootState } from "../../../state"
import Typography from "../../components/Typography/Typography"
import { TypographyVariant } from "../../components/types"
import { Spinner } from "../../components/Spinner"
import { useIcons } from "../../../hooks/useIcons"
import {
  resetStatusUpdate,
  setAction,
  setDetailsGenState,
  triggerOrderList,
  triggerOrderUpdate,
} from "../../../features/orders/order_slice"
import Loader from "../../components/Loader"
import { formatDate } from "../../../utilities/helpers"
import { toast } from "react-toastify"
import Pill from "../../components/Pill"
import AcceptOrder from "../../components/acceptOrder"
import DeclineRequest from "../../components/declineRequest"

const ITEMS_PER_PAGE = 12

function Orders() {
  const dispatch = useDispatch<AppDispatch>()

  // Redux state selectors - using a more generic approach
  const orderState = useSelector((state: RootState) => state.order)
  const loading = orderState?.loading || false

  // We'll use a local state to track updates instead of relying on Redux state properties
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState(false)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterActive, setFilterActive] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(ITEMS_PER_PAGE)

  const handleCloseDetails = () => setExpandedRow(null)
  const { orderData, orderUpdate, action } = useSelector((state: RootState) => state.order)
  const [issModalOpen, setIssModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [allOrders, setAllOrders] = useState<any[]>([])
  const [details, setDetails] = useState<Record<string, Record<string, string> | any>>({})
  const {  phone, mail, avatar } = useIcons()
  const [totalOrderCount, setTotalOrderCount] = useState(0)

  const handleDetailsClick = (id: number) => {
    // Toggle expanded row
    setExpandedRow((prev) => (prev === id ? null : id));

    // Add to selected rows if not already present
    if (!selectedRows.includes(id)) {
      setSelectedRows((prev) => [...prev, id]);
    }

    // Always find order from allOrders
    const view = allOrders.find((row) => Number(row.order_number) === id);
    if (view) {
      setDetails(view);
      dispatch(setDetailsGenState(view));
    }
  };

  const handleOrderStatus = (text: string, reason?: string) => {
    dispatch(setAction(text));

    const payload = {
      order_id: details.id,
      order_status: text,
      reason: text === "REJECTED" ? reason : "",
    };

    dispatch(triggerOrderUpdate(payload));

    handleCloseDetails();
    dispatch(triggerOrderList(payload));
  };

  useEffect(() => {
    const orders = orderData.data.data;

    if (orders?.length > 0) {
      const sortedOrders = [...orders].sort(
        (a: { status_ts: number }, b: { status_ts: number }) => b.status_ts - a.status_ts
      );

      setAllOrders(sortedOrders);
      setTotalOrderCount(sortedOrders.length);
    }
  }, [orderData]);

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

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="relative w-full">
      {/* Orders Table */}
      <div className="overflow-x-auto w-full">
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
            </div>

            <div>
              <select className="border-[#C0D5DE] border rounded p-2 px-4 text-[14px]">
                <option>All categories</option>
              </select>
            </div>
          </div>

          <div className="w-full rounded-md overflow-hidden relative">
            <div className="overflow-x-auto w-full">
              <Table
                striped
                highlightOnHover
                withTableBorder
                className="min-w-full w-full table-auto bg-white"
              >
                <Table.Thead className="bg-white">
                  <Table.Tr>
                    <Table.Th className="p-3 text-left font-title">Date</Table.Th>
                    <Table.Th className="p-3 text-left font-title">Customer</Table.Th>
                    <Table.Th className="p-3 text-left font-title">Status</Table.Th>
                    <Table.Th className="p-3 text-left font-title">Location</Table.Th>
                    <Table.Th className="p-3 text-left font-title">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {allOrders.map((order) => (
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
                                      : order.status === 'REJECTED'
                                        ? 'bg-gray-100 text-gray-800'
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
                            {order.delivery_details.address.lga},{" "}
                                                  {order.delivery_details.address.full_address}
                          </span>
                        </div>
                      </Table.Td>
                      <Table.Td className="p-3">
                        <button
                          className="text-blue-500 hover:text-blue-700 font-medium"
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
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Items per page:</span>
              <select
                className="border rounded p-1"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              >
                <option value={10}>10</option>
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
                {Array.from({ length: Math.min(5, totalOrderCount) }, (_, i) => {
                  const pageNumber =
                    currentPage > 3 && totalOrderCount > 5
                      ? currentPage - 3 + i + (totalOrderCount - currentPage < 2 ? totalOrderCount - currentPage - 2 : 0)
                      : i + 1

                  if (pageNumber <= totalOrderCount) {
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalOrderCount))}
                disabled={currentPage === totalOrderCount}
              >
                Next
                <MdDoubleArrow />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details View */}
      {expandedRow && (
        <div className="fixed top-0 right-0 z-50 h-screen w-[90%] max-w-5xl bg-white shadow-lg rounded-l-md p-6 overflow-y-auto animate-slide-in">
          <div className="flex justify-between items-center pr-4 mb-4">
            <Typography variant={TypographyVariant.SUBTITLE} className="font-bold text-lg">
              Customer Details
            </Typography>
            <span className="flex gap-2 items-center">
              <Pill text={details?.status} />
              <MdOutlineClose className="cursor-pointer text-xl" onClick={handleCloseDetails} />
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex gap-2 items-center">
              <img src={avatar} alt="name" className="h-4 w-4" />
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {details?.delivery_details?.name}
              </Typography>
            </div>
            <div className="flex gap-2 items-center">
              <img src={phone} alt="phone" className="h-4 w-4" />
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {details?.delivery_details?.phone}
              </Typography>
            </div>
            <div className="flex gap-2 items-center">
              <img src={mail} alt="mail" className="h-4 w-4" />
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {details?.delivery_details?.email}
              </Typography>
            </div>
            <div className="flex gap-2 items-center">
              <IoLocationOutline color="#1D2939" />
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {details?.delivery_details?.address?.full_address}
              </Typography>
            </div>
          </div>

          <p className="text-black text-[14px] font-bold mb-2">Ordered Items</p>
          <div className="p-2 space-y-4 bg-white rounded shadow-sm">
            {details?.orders?.map((order: any, index: number) => (
              <div key={index} className="border-b border-[#EAECF0] pb-2">
                <div className="flex justify-between">
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                    {order.weight}KG {order.product_category}
                  </Typography>
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>{order.cost}</Typography>
                </div>
                <div className="flex justify-between mt-1">
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Gas Quantity</Typography>
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>{order.quantity}</Typography>
                </div>
              </div>
            ))}

            <div className="flex justify-between font-medium pt-2">
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Subtotal</Typography>
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {Number(details?.orders?.reduce((accum: any, item: any) => accum + item.cost, 0)).toLocaleString()}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Delivery Fee</Typography>
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {Number(details?.delivery_fee).toLocaleString()}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Service Fee</Typography>
              <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                {Number(details?.service_fee).toLocaleString()}
              </Typography>
            </div>
            <div className="flex justify-between text-[14px] font-bold pt-2">
              <p>Total</p>
              <p className="text-[#3EAF3F] font-semibold">
                {Number(details?.total).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Status-based actions */}
          {details?.status === 'PENDING' && (
            <div className="flex justify-center gap-10 mt-6">
              <button
                className="border border-[#EF0F30] bg-red-100 text-[#EF0F30] px-8 py-2 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                {action === 'REJECTED' && orderUpdate.loading ? <Spinner /> : <>Decline</>}
              </button>
              <button
                onClick={() => setIssModalOpen(true)}
                className="bg-[#3EAF3F] text-white px-8 py-2 rounded"
              >
                {action !== 'REJECTED' && orderUpdate.loading ? <Spinner /> : <>Accept</>}
              </button>
            </div>
          )}

          {details?.status === 'ACCEPTED' && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleOrderStatus('PROCESSED')}
                className="bg-[#3EAF3F] text-white px-8 py-2 rounded"
              >
                {orderUpdate.loading ? <Spinner /> : <>PROCESSED</>}
              </button>
            </div>
          )}

          {details?.status === 'PROCESSED' && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleOrderStatus('SHIPPED')}
                className="bg-[#3EAF3F] text-white px-8 py-2 rounded"
              >
                {orderUpdate.loading ? <Spinner /> : <>SHIPPED</>}
              </button>
            </div>
          )}

          <DeclineRequest isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleOrderStatus} />
          <AcceptOrder isOpen={issModalOpen} onClose={() => setIssModalOpen(false)} onSubmit={handleOrderStatus}/>
        </div>
      )}
    </div>
  )
}

export default Orders
