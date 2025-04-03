import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdDoubleArrow } from "react-icons/md"
import type { AppDispatch, RootState } from "../../state"
import Typography from "../components/Typography/Typography"
import { TypographyVariant } from "../components/types"
import { useIcons } from "../../hooks/useIcons"
import AcceptOrder from "../components/accepttOrder"
import DeclineRequest from "../components/declineRequest"
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
import { Spinner } from "../components/Spinner"
import Pill from "../components/Pill"
import { IoLocationOutline } from "react-icons/io5"
import PaginationSizeDropdown from "../components/PaginationSizeDropdown"

// unused mock data
// interface RowData {
//   id: number
//   customer: string
//   date: string
//   details: string
// }

// const data: RowData[] = [
//   { id: 1, customer: "John Doe", date: "2024-12-20", details: "Order #123" },
//   { id: 2, customer: "Jane Smith", date: "2024-12-19", details: "Order #456" },
//   { id: 3, customer: "Smith Johnson", date: "2024-12-18", details: "Order #789" },
//   { id: 4, customer: "John Doe", date: "2024-12-20", details: "Order #123" },
//   { id: 5, customer: "Doe Smith", date: "2024-12-19", details: "Order #456" },
//   { id: 6, customer: "Alice Johnson", date: "2024-12-18", details: "Order #789" },
//   { id: 7, customer: "Alice Joel", date: "2024-12-18", details: "Order #789" },
//   { id: 8, customer: "Jane Joel", date: "2024-12-18", details: "Order #789" },
// ]

const Orders = () => {
  const dispatch: AppDispatch = useDispatch()
  const { orderData, orderUpdate, action } = useSelector((state: RootState) => state.order)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [issModalOpen, setIssModalOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const { arrows, filter, phone, mail, avatar, side } = useIcons()
  const [activeTab, setActiveTab] = useState("ALL")
  const [selectedTab, setSelectedTab] = useState<Record<string, Record<string, string> | any>>({})
  const [order, setOrder] = useState<Record<string, Record<string, string> | any>>({})
  const [details, setDetails] = useState<Record<string, Record<string, string> | any>>({})
  const [pageSize, setPageSize] = useState<number>(100)
  const [allOrders, setAllOrders] = useState<any[]>([])
  const [totalOrderCount, setTotalOrderCount] = useState(0)

  const handleDetailsClick = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id))
    if (!selectedRows.includes(id)) {
      setSelectedRows((prev) => [...prev, id])
    }

    let view
    if (activeTab === "ALL") {
      view = allOrders.find((row: { order_number: number }) => Number(row.order_number) === id)
    } else {
      view = selectedTab[activeTab].data.find((row: { order_number: number }) => Number(row.order_number) === id)
    }

    setDetails(view)
    dispatch(setDetailsGenState(view))
  }

  const handleCloseDetails = () => setExpandedRow(null)

  const handleOrderStatus = (text: string, reason?: string) => {
    dispatch(setAction(text))
    if (text === "REJECTED") {
      const payload = {
        order_id: details.id,
        order_status: "REJECTED",
        reason,
      }
      dispatch(triggerOrderUpdate(payload))
    } else {
      const payload = {
        order_id: details.id,
        order_status: text,
        reason: "",
      }
      dispatch(triggerOrderUpdate(payload))
    }
  }

  const formText = (status?: string): string => {
    const currentStatus = status || activeTab;

    const statusMessages: Record<string, string> = {
      PENDING: "placed a new order",
      CANCELLED: "cancelled order",
      ACCEPTED: "order was accepted",
      REJECTED: "order was rejected",
    };

    return statusMessages[currentStatus] || "order is completed";
  }

  const handleGotIt = () => {
    const payload = {
      paging: {
        index: 0,
        size: pageSize,
      },
    }
    dispatch(triggerOrderList(payload))
    handleCloseDetails()
    setIssModalOpen(false)
  }

  useEffect(() => {
    const orders = orderData.data.data;

    if (orders?.length > 0) {
      const sortedOrders = [...orders].sort(
          (a: { status_ts: number }, b: { status_ts: number }) => b.status_ts - a.status_ts
      );

      setAllOrders(sortedOrders);
      setTotalOrderCount(sortedOrders.length);

      // group orders by status
      const groupedOrders = sortedOrders.reduce(
          (acc: Record<string, { data: any[]; count: number }>, order: { status: string }) => {
            if (!acc[order.status]) {
              acc[order.status] = { data: [], count: 0 };
            }
            acc[order.status].data.push(order);
            acc[order.status].count += 1;
            return acc;
          },
          {}
      );

      setOrder(groupedOrders);

      // Create tab data
      const allTabData = {
        ALL: { data: sortedOrders, count: sortedOrders.length },
      };

      if (activeTab === "ALL") {
        setSelectedTab(allTabData);
      } else {
        const availableTabs = Object.keys(groupedOrders);
        if (!activeTab && availableTabs.length > 0) {
          setActiveTab(availableTabs[0]);
          setSelectedTab({ [availableTabs[0]]: groupedOrders[availableTabs[0]] });
        } else if (activeTab && groupedOrders[activeTab]) {
          setSelectedTab({ [activeTab]: groupedOrders[activeTab] });
        }
      }
    }
  }, [orderData.data, activeTab]);

  useEffect(() => {
    const payload = {
      paging: {
        index: 0,
        size: pageSize,
      },
    }
    dispatch(triggerOrderList(payload))
  }, [dispatch, pageSize])

  useEffect(() => {
    if (orderUpdate.data.success === "success" && !orderUpdate.error) {
      setIssModalOpen(true)
      dispatch(resetStatusUpdate())
      setIsModalOpen(false)
    } else if (orderUpdate.message && orderUpdate.error) {
      toast.error(`${orderUpdate.message}`)
    }
  }, [dispatch, orderUpdate])

  return (
    <div className="p-4">
      <Typography variant={TypographyVariant.TITLE}>Order Details</Typography>
      {orderData.loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader width="80px" height="80px" />
        </div>
      ) : (
        <>
          <div className="border-b-[0.2px] border-[#EAECF0] mt-4">
            <div className="flex space-x-4">
              <div
                key="ALL"
                onClick={() => {
                  setActiveTab("ALL")
                  setSelectedTab({
                    ALL: {
                      data: allOrders,
                      count: totalOrderCount,
                    },
                  })
                  handleCloseDetails()
                }}
                className={`cursor-pointer py-2 px-4 text-sm font-medium ${
                  activeTab === "ALL" ? "border-b-2 border-[#141388] text-[#141388]" : "text-gray-500"
                }`}
              >
                ALL ({totalOrderCount})
              </div>
              {Object.keys(order).map((tab) => (
                <div
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setSelectedTab({ [tab]: order[tab] })
                    handleCloseDetails()
                  }}
                  className={`cursor-pointer py-2 px-4 text-sm font-medium ${
                    activeTab === tab ? "border-b-2 border-[#141388] text-[#141388]" : "text-gray-500"
                  }`}
                >
                  {tab} ({order[tab].count})
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div className="flex justify-end gap-2">
              <button className="flex items-center gap-2 px-2 py-1 border border-[#EAECF0] text-[12px] rounded">
                <img src={arrows} alt="Icon" className="w-4 h-4" />
                <span className="text-gray-800">Sort by</span>
              </button>
              <button className="flex items-center gap-2 px-2 py-1 border border-[#EAECF0] text-[12px] rounded">
                <img src={filter} alt="Icon" className="w-4 h-4" />
                <span className="text-gray-800">Filter</span>
              </button>
              <PaginationSizeDropdown pageSize={pageSize} onChange={(size) => setPageSize(size)} />
            </div>
          </div>
          <div className="flex pb-8">
            {/* Truncated Table */}
            <div className={`transition-all duration-300 ${expandedRow ? "w-[30%]" : "w-full"}`}>
              <table className="w-full border-collapse">
                <thead className="bg-white">
                  <tr>
                    <th className="border-b border-[#EAECF0] p-2 text-left">Customer</th>
                    {!expandedRow && (
                      <>
                        <th className="border-b border-[#EAECF0] p-2 text-left">Date</th>
                        <th className="border-b border-[#EAECF0] p-2 text-left">Status</th>
                        <th className="border-b border-[#EAECF0] p-2 text-left">Details</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {selectedTab[activeTab]?.data?.map((row: Record<string, string | number | any>) => {
                    return (
                      <React.Fragment key={row.order_number}>
                        <tr className={`${expandedRow === row.id ? "bg-[#EAECF0]" : "hover:bg-[#EAECF0] transition"}`}>
                          <td className="border-b border-[#EAECF0] p-2">
                            {row.delivery_details.name}{" "}
                            {!expandedRow && (activeTab === "ALL" ? formText(row.status) : formText())} for{" "}
                            <span className="font-bold">"Gas Cylinders"</span>
                          </td>
                          {!expandedRow && (
                            <>
                              <td className="border-b border-[#EAECF0] p-2 text-gray">{formatDate(row?.status_ts)}</td>
                              <td className="border-b border-[#EAECF0] p-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    row.status === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : row.status === "ACCEPTED"
                                        ? "bg-blue-100 text-blue-800"
                                        : row.status === "PROCESSED"
                                          ? "bg-purple-100 text-purple-800"
                                          : row.status === "SHIPPED"
                                            ? "bg-green-100 text-green-800"
                                            : row.status === "CANCELLED"
                                              ? "bg-red-100 text-red-800"
                                              : row.status === "REJECTED"
                                                ? "bg-gray-100 text-gray-800"
                                                : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {row.status}
                                </span>
                              </td>
                              <td className="border-b border-[#EAECF0] p-2">
                                <button
                                  className="flex gap-4 items-center text-[#141388]"
                                  onClick={() => handleDetailsClick(Number(row.order_number))}
                                >
                                  View Order Details <img src={side} alt="arrow" />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {/* Detailed Content Div */}
            {expandedRow && (
              <div
                className="w-[70%] h-[70vh] bg-gray-100 p-6 border border-[#EAECF0] transition-transform duration-300 ease-in-out "
                style={{ overflowY: "auto" }}
              >
                <div className="flex justify-between pr-4">
                  <Typography variant={TypographyVariant.SUBTITLE} className="font-bold text-lg">
                    Customer Details
                  </Typography>
                  <span className="flex gap-2 items-center">
                    <Pill text={details?.status || activeTab} />
                    <MdDoubleArrow className="cursor-pointer" onClick={handleCloseDetails} />
                  </span>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <img src={avatar} alt="name" className="h-4 w-4" />
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                    {details?.delivery_details?.name}
                  </Typography>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <img src={phone} alt="phone" className="h-4 w-4" />
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                    {details?.delivery_details?.phone}
                  </Typography>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <img src={mail} alt="mail" className="h-4 w-4" />
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                    {details?.delivery_details?.email}
                  </Typography>
                </div>
                <div className="flex gap-2 items-center mt-2 mb-8">
                  <IoLocationOutline color="#1D2939" />
                  <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                    {details?.delivery_details?.address?.full_address}
                  </Typography>
                </div>

                <p className="text-black text-[14px] font-bold">Ordered Items</p>
                <div className="p-2">
                  {details?.orders?.map((order: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="flex p-1 justify-between border-b border-[#EAECF0]">
                          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                            {order.weight}KG {order.product_category}
                          </Typography>
                          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>{order.cost}</Typography>
                        </div>
                        <div className="flex p-1 justify-between border-b border-[#EAECF0] mb-4">
                          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Gas Quantity</Typography>
                          <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>{order.quantity}</Typography>
                        </div>
                      </React.Fragment>
                    )
                  })}
                  <div className="flex p-1 justify-between">
                    <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Subtotal</Typography>
                    <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                      {Number(
                        details?.orders?.reduce((accum: any, item: any) => accum + item.cost, 0),
                      ).toLocaleString()}
                    </Typography>
                  </div>
                  <div className="flex p-1 justify-between">
                    <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Delivery Fee</Typography>
                    <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                      {Number(details?.delivery_fee).toLocaleString()}
                    </Typography>
                  </div>
                  <div className="flex p-1 justify-between">
                    <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Service Fee</Typography>
                    <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>
                      {Number(details?.service_fee).toLocaleString()}
                    </Typography>
                  </div>
                  <div className="flex p-1 justify-between">
                    <p className="font-bold text-14px">Total</p>
                    <p className="text-[#3EAF3F] leading-[26px] font-medium">
                      {Number(details?.total).toLocaleString()}
                    </p>
                  </div>
                </div>
                {(activeTab === "PENDING" || (activeTab === "ALL" && details?.status === "PENDING")) && (
                  <div className="flex justify-center gap-40 mt-2 mb-2">
                    <button
                      className="border border-[#EF0F30] bg-red-100 text-[#EF0F30] px-14 py-2"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {action === "REJECTED" && orderUpdate.loading ? <Spinner /> : <>Decline</>}
                    </button>
                    <button
                      onClick={() => handleOrderStatus("ACCEPTED")}
                      className="bg-[#3EAF3F] text-white px-14 py-2"
                    >
                      {action !== "REJECTED" && orderUpdate.loading ? <Spinner /> : <>Accept</>}
                    </button>
                  </div>
                )}
                {(activeTab === "ACCEPTED" || (activeTab === "ALL" && details?.status === "ACCEPTED")) && (
                  <div className="flex justify-center gap-40 mt-2 mb-2">
                    <button
                      onClick={() => handleOrderStatus("PROCESSED")}
                      className="bg-[#3EAF3F] text-white px-14 py-2"
                    >
                      {action !== "REJECTED" && orderUpdate.loading ? <Spinner /> : <>PROCESSED</>}
                    </button>
                  </div>
                )}
                {(activeTab === "PROCESSED" || (activeTab === "ALL" && details?.status === "PROCESSED")) && (
                  <div className="flex justify-center gap-40 mt-2 mb-2">
                    <button onClick={() => handleOrderStatus("SHIPPED")} className="bg-[#3EAF3F] text-white px-14 py-2">
                      {action !== "REJECTED" && orderUpdate.loading ? <Spinner /> : <>SHIPPED</>}
                    </button>
                  </div>
                )}
                <DeclineRequest
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleOrderStatus}
                />
                <AcceptOrder isOpen={issModalOpen} onClose={handleGotIt} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Orders

